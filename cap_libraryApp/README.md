# Library App with SAP CAP 📚

This application is built using SAP Cloud Application Programming Model (CAP) and serves as a learning tool to understand key concepts in CAP development. It provides a structured approach to managing Authors and Books, which are the core entities in this system.

### Purpose
The primary goals of this application are:
- File Structure and Routing: Gain insight into how files and folders are organized within a CAP application and how routing is configured.
- Domain Logic and Data Modeling: Understand the principles of domain logic through effective data modeling.
- Core Data Services (CDS):
  - Learn to declaratively define service definitions, data models, queries, and expressions using CDS.
  - Explore how CDS transforms these definitions into various target languages for use within the application.

### Features
- Authors Entity: Manage details about authors, including their profiles and related metadata.
- Books Entity: Catalog books and associate them with their respective authors.
- CDS-Based Model: Demonstrates how to leverage CDS for defining relationships, constraints, and data queries effectively.

## File path
It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`data` | .csv files with data to run locally
`srv/` | your service models and code go here
`test` | Testing .http files with OData
`package.json` | project metadata and configuration
`readme.md` | this getting started guide

## Next Steps

- Clone the repo.
- Open a new terminal and run `npm i`
- Then, run `cds watch`

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
