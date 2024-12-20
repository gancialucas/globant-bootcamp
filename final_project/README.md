# Logistic Management App 🚚📦

This repository contains a CAP (Cloud Application Programming) service for managing packages, vehicles, and drivers in a logistics operation. The application leverages SAP CAP and integrates with external services to manage and optimize logistics processes.

## Overview

This app provides an end-to-end solution to manage logistics operations. It focuses on:
* Managing packages with dimensions, weight, and destinations.
* Associating packages with vehicles and drivers.
* Monitoring and optimizing the logistics process.
* External integration with SAP Business Partner API for driver information.
The application is built using SAP CAP, ensuring scalability and compatibility with SAP BTP (Business Technology Platform).

### Aplication Routes
* Link: https://c3ec7230trial-dev-fp-logandshipping-srv.cfapps.us10-001.hana.ondemand.com/

## Features

1. CRUD operations for:
    * Package
    * Vehicles
    * Drivers
2. Validation for:
    * Package dimensions, weight, and mandatory fields.
    * Vehicle load capacity.
3. Associations between:
    * Vehicles and Packages.
    * Drivers (via external Business Partner integration).
4. Actions to optimize logistics (e.g., assign packages to vehicles).

## Data Model
### Entities

`Packages`

Manages individual packages, including:
* Weight (mandatory).
* Dimensions (length, width, height).
* Receiver information (name, phone, email).
* Destination (city, street, address).
Vehicle assignment via associations.

`Vehicles`

Handles information about logistics vehicles, including:
* Plate (unique key).
* Load capacity.
* Driver information (name, seniority, etc.).
* Packages association.

`Drivers`

Driver data is projected from the SAP Business Partner API.

### Types
* Dimensions: Includes length, width, and height.
* Receiver: Contact information for the package receiver.
* Destination: Details about delivery location.

---

## Author

**Lucas Gancia**

Feel free to reach out for questions or collaboration at:

- **Email**: [lucasgancia@gmail.com](mailto:lucasgancia@gmail.com)
- **GitHub**: [github.com/lucasgancia](https://github.com/lucasgancia)