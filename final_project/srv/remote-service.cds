using {schema.logistic as db} from '../db/schema';

service RemoteService @(path: '/drivers') {
  entity Drivers  as projection on db.Drivers;
  entity Vehicles as projection on db.Vehicles;
  action idBupaDriver( idVehicle : db.Vehicles:plate) returns String;
}
