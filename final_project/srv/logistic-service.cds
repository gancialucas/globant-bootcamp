using {schema.logistic as db} from '../db/schema';

service LogisticService @(path: '/logistic') {
    entity Packages as projection on db.Packages
        actions {
            action delivered(idPack : db.Packages:ID) returns {
                taken : db.Packages:taken;
            };
        };

    entity Vehicles as projection on db.Vehicles
        actions {
            action parcel(idVehicle : db.Vehicles:plate, quantity : Integer) returns {
                numberOfPackages : db.Vehicles:numberOfPackages;
            };

            action cancelShipment(idVehicle : db.Vehicles:plate)             returns {
                isActive : db.Vehicles:isActive;
            };
        };
}
