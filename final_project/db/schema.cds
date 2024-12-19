namespace schema.logistic;

using {
    cuid,
    managed
} from '@sap/cds/common';


entity Packages : cuid, managed {
    weight      : Decimal(10, 2)              @mandatory;
    dimensions  : Dimensions                  @mandatory;
    receiver    : Receiver                    @mandatory;
    destination : Destination                 @mandatory;
    taken       : Boolean default false;
    vehicle     : Association to one Vehicles @assert.target;
}

type Dimensions {
    length : Decimal(10, 2);
    height : Decimal(10, 2);
    width  : Decimal(10, 2);
}

type Receiver {
    name  : String(120);
    cel   : String(120);
    email : String(120);
}

type Destination {
    city         : String(120);
    street       : String(120);
    address      : String(120);
    neighborhood : String(120);
}

entity Vehicles : managed {
    key plate            : String(120)                     @mandatory;
        loadCapacity     : String(120)                     @mandatory;
        isActive         : Boolean default true;
        driver           : Driver;
        numberOfPackages : Integer default 0;
        packages         : Association to many Packages
                               on packages.vehicle = $self @assert.target;
}

type Driver {
    name              : String(120);
    dateOfBirth       : Date;
    seniority         : Integer;
    businessPartnerID : String;
}

using {API_BUSINESS_PARTNER as bupa} from '../srv/external/API_BUSINESS_PARTNER';

entity Drivers as
    projection on bupa.A_BusinessPartner {
        key BusinessPartner          as ID,
            BusinessPartnerFullName  as fullName,
            BusinessPartnerIsBlocked as isBlocked
    }
