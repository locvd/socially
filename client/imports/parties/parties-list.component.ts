import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Mongo } from 'meteor/mongo';
import { Party } from '../../../both/interfaces/party.interface';

import { Parties } from '../../../both/collection/parties.collection';
import { PartiesFormComponent } from './parties-form.component';
import { LoginButtons } from 'angular2-meteor-accounts-ui';

import template from './parties-list.component.html';

@Component({
    selector: 'parties-list',
    template,
    directives: [PartiesFormComponent, ROUTER_DIRECTIVES, LoginButtons]
})

export class PartiesListComponent implements OnInit {
    parties: Mongo.Cursor<Party>;

    ngOnInit() {
        this.parties = Parties.find();
    }

    removeParty(party) {
        Parties.remove(party._id);
    }
}
