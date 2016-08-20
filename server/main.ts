import { loadParties } from './imports/fixtures/parties';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    loadParties();
})
