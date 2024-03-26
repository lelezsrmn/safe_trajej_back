


class Danger {
    static DangerType = { // Fr ou Us ?
        Homicide: 'homicide',
        Rape: 'rape',
        Robbery: 'robbery',
        Vol: 'vol',
        Agression: 'agression',
        Personne_suspect: 'personne  '
    }
    constructor(danger_type, position) {
        this._danger_type = danger_type;
        this._position = position;
    }
    get_danger_type() {
        return this._danger_type;
    }
    get_position() {
        return this._position;
    }
    set_danger_type(danger_type) {
        this._danger_type = danger_type;
    }
    set_position(latidude, longitude) {
        this._position = [latidude, longitude];
    }
    //set_longitude(longitude) {
     //   this._longitude = longitude;
    //}
    //set_decription(description) {
    //    this._decription = description;
    //}
    //set_id_client(id_client) {
    //    this._id_client = id_client;
    //}
    //set_date_incident(date_incident) {
    //    this._date_incident = date_incident;
    //}

    //set_street(street) {
    //    this._street = street;
    //}

    set_id(id) {
        this._id = id;
    }

 }

module.exports = Danger;