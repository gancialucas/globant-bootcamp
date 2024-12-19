const cds = require('@sap/cds');

class RemoteService extends cds.ApplicationService {
    async init() {
        const { Drivers } = this.entities

        this.bupa = await cds.connect.to('API_BUSINESS_PARTNER')
        this.on('READ', Drivers, this.readDrivers)
        this.on('idBupaDriver', this.checkDriverVehicles);

        return super.init()
    }

    readDrivers(req) {
        console.log(JSON.stringify(req.query))
        return this.bupa.run(req.query)
    }

    async checkDriverVehicles(req) {
        const { Drivers, Vehicles } = this.entities;
        const { idBupa, idVehicle } = req.data;

        const vehicle = await SELECT.one.from(Vehicles).where({ plate: idVehicle });

        if (!vehicle) {
            return req.error(`No vehicle was found with the license plate: ${idVehicle}.`);
        }
        
        const result = await this.bupa.run(SELECT.from(Drivers));

        const filteredData = result.map(driver => ({
            ID: driver.ID,
            fullName: driver.fullName,
            isBlocked: driver.isBlocked
        }));

        const matchedDriver = filteredData.find(driver => driver.ID === vehicle.driver_businessPartnerID);

        if (matchedDriver) {
            if (matchedDriver.isBlocked) {
                return req.error(`Driver ${matchedDriver.fullName} is locked out and cannot drive the vehicle.`);
            }

            return {
                message: `Driver ${matchedDriver.fullName} is authorized to drive the vehicle with license plate ${idVehicle}.`
            };
        }

        return req.error(`A driver with ID ${idBupa} was not found in the external system.`);
    }
}

module.exports = RemoteService