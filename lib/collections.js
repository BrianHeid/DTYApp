import { Mongo } from 'meteor/mongo';

PatientEmails = new Mongo.Collection('PatientEmails');
Profiles = new Mongo.Collection('Profiles');
Patients = new Mongo.Collection('Patients');
Providers = new Mongo.Collection('Providers');
Admins = new Mongo.Collection('Admins');
Shifts = new Mongo.Collection('Shifts');

Requests = new Mongo.Collection('Requests');
Treatments = new Mongo.Collection('Treatments');
Files = new Mongo.Collection('Files');
Followups = new Mongo.Collection('Followups');
Messages = new Mongo.Collection('Messages');
Reviews = new Mongo.Collection('Reviews');

Events = new Mongo.Collection( 'events' );
Tokens = new Mongo.Collection('tokens');


