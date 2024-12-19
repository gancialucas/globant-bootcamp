const cds = require('@sap/cds')

class LogisticService extends cds.ApplicationService {
    init() {
        this.on('parcel', this.submitPackages)
        this.on('cancelShipment', this.cancelOperation)
        this.on('delivered', this.deliveredPackage)

        return super.init()
    }

    /*****************
        FUNCTIONS
    ******************/

    /**************
        ACTIONS
    ***************/
    async submitPackages(req) {
        const { Vehicles } = this.entities
        const { idVehicle, quantity } = req.data

        if (quantity < 1) {
            return req.error(`The quantity must be at least 1.`)
        }

        // We bring the Vehicle requested by id=plate
        const vehicle = await SELECT.one.from(Vehicles).where({ plate: idVehicle })

        if (!vehicle) {
            return req.error(`The vehicle with plate: ${idVehicle} doesn't exist`)
        }

        if (vehicle.isActive == false) {
            return req.error(`The vehicle with plate: ${idVehicle} is not in operation.`)
        }

        if (quantity > 100) {
            return req.error(`The amount of package is too much for the vehicle`)
        }

        // Destructuring of the vehicle object
        const { numberOfPackages } = vehicle

        // Assigning a new variable the new total amount of packages
        let newQuantity = numberOfPackages + quantity

        // Updating the Database
        await UPDATE(Vehicles).where({ plate: idVehicle }).with({ numberOfPackages: newQuantity })

        return { numberOfPackages: numberOfPackages + quantity }
    }

    async cancelOperation(req) {
        const { Vehicles, Packages } = this.entities
        const { idVehicle } = req.data

        const vehicle = await SELECT.one.from(Vehicles).where({ plate: idVehicle })
        const packages = await SELECT.from(Packages).where({ vehicle: idVehicle })

        for (let pack of packages) {
            // If at least one package has not been taken, the shipment cannot be cancelled.
            if (pack.taken == true) {

                if (!vehicle) {
                    return req.error(`The vehicle with plate: ${idVehicle} doesn't exist`)
                }

                if (vehicle.isActive == false) {
                    return req.error(`The vehicle with license plate: ${idVehicle} is already inactive`)
                }

                await UPDATE(Vehicles).where({ plate: idVehicle }).with({ isActive: false })

                return { isActive: false }

            } else {
                return req.error(`The shipment cannot be cancelled because there are packages to be delivered.`)
            }
        }
    }

    async deliveredPackage(req) {
        const { Packages } = this.entities
        const { idPack } = req.data

        const pack = await SELECT.one.from(Packages).where({ ID: idPack })

        if (pack.taken == false) {
            await UPDATE(Packages).where({ ID: idPack }).with({ taken: true })

            return { taken: true }
        } else {
            return req.error(`The package has already been delivered`)
        }
    }
}

module.exports = LogisticService