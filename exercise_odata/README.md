# Northwind OData 📦
A simple OData service optimized for quick browser demos.

## Overview
This exercise demonstrates examples of interacting with the Northwind OData API to retrieve data through different types of queries. The Northwind OData API is a demo service that provides access to a sample database featuring data about products, customers, customerDemographics, orders, regions, suppliers, territories and employees. 

With OData, you can perform advanced queries using filtering, sorting, and expansion capabilities.

## Base URL & Root Request example
The base URL for the Northwind OData service is `https://services.odata.org/V2/Northwind/Northwind.svc/`

The way it can be used is
```http
@base_url = https://services.odata.org/V2/Northwind/Northwind.svc/

### ------------------------------------------------
# Root request 
# It results in the different types of data that it stores -> Entities
GET {{base_url}}/
```

## Exercise points
* Get orders with customer details
* Get the employees who report to manager "2"
* Get the products that are in stock (inventory)
* Get only the names and codes of products that are NOT in stock (inventory)
* Get the 5 most expensive products
* Find the orders that were shipped to "Germany"
* Get only the names and prices of products in the category "Beverages"

## Most used OData query parameters
Here are some commonly used OData query parameters demonstrated in this repository:
* `$filter`: Filters results based on specified criteria.
* `$select`: Retrieves specific properties from the response.
* `$top`: Limits the response to the first N results.
* `$orderby`: Sorts results based on a property.
* `$expand`: Includes related entities in the response.

## + info
For a comprehensive list of OData parameters and advanced query capabilities, refer to the official [OData Documentation](https://www.odata.org/).
