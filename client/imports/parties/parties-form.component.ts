import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';
import template from './parties-form.component.html';

import { Parties } from '../../../both/collection/parties.collection';

@Component({
    selector: 'parties-form',
    template,
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class PartiesFormComponent implements OnInit {
    addForm: FormGroup;
    constructor(private formBuilder: FormBuilder) { }

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
            Parties.insert(this.addForm.value);
            this.resetForm();
        }
    }
};
