using app.interactions as db from '../db/interaction';
using {sap} from '@sap/cds-common-content';
using V_INTERACTION from '../db/interaction';

service CatalogService {
    // @odata.draft.enabled: true --> disabled for acces problem

    @requires: 'authenticated-user'
    @cds.redirection.target
    entity Interactions_Header as projection on db.Headers;

    @requires: 'Admin'
    entity Interactions_Items  as projection on db.Items;

    @readonly
    entity Lenguages           as projection on sap.common.Languages;

    @readonly
    @restric: [{
        grant: 'READ',
        where: 'country_code= ''DE'''
    }]
    entity HeaderView          as projection on db.Headers;

    function sleep() returns Boolean;

    @readonly
    entity V_Interaction       as projection on V_INTERACTION;
}
