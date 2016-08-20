import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import template from './party-details.component.html';

import { Parties } from '../../../both/collection/parties.collection';
import { Tracker } from 'meteor/tracker';
import { Party } from '../../../both/interfaces/party.interface';

import { CanActivate } from '@angular/router';

@Component({
    selector: 'party-details',
    template,
    directives: [ROUTER_DIRECTIVES]
})
export class PartyDetailsComponent implements CanActivate {
    partyId: string;
    party: Party;

    constructor(private route: ActivatedRoute, private ngZone: NgZone) { }

    canActivate() {
        const party = Parties.findOne(this.partyId);
        return (party && party.owner == Meteor.userId());
    }

    ngOnInit() {
        this.route.params
            .map(params => params['partyId'])
            .subscribe(partyId => {
                this.partyId = partyId;
                Tracker.autorun(() => {
                    this.ngZone.run(() => {
                        this.party = Parties.findOne(this.partyId);
                    });
                });
            });
    }
    saveParty() {
        Parties.update(this.party._id, {
            $set: {
                name: this.party.name,
                description: this.party.description,
                location: this.party.location
            }
        });
    }
}
