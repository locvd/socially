import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';
import template from './parties-form.component.html';

import { Parties } from '../../../both/collection/parties.collection';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';

@Component({
    selector: 'parties-form',
    template,
    directives: [REACTIVE_FORM_DIRECTIVES]
})
@InjectUser('user')
export class PartiesFormComponent extends MeteorComponent {
    addForm: FormGroup;
    user: Meteor.User;

    constructor(private formBuilder: FormBuilder) {
        super();
        console.log(this.user);
    }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [],
            location: ['', Validators.required]
        });
    }

    resetForm() {
        this.addForm.controls['name']['updateValue']('');
        this.addForm.controls['description']['updateValue']('');
        this.addForm.controls['location']['updateValue']('');
    }
    addParty() {
        if (this.addForm.valid) {
            if (Meteor.userId()) {
                Parties.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }));
                this.resetForm();
            } else {
                alert('Please log in to add a party');
            }
        }
    }
};
