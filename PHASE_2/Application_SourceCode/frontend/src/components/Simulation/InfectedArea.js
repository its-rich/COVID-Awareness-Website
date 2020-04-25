export default class InfectedArea {

    constructor(lat, long, chance, population, map) {
        this.lat = lat;
        this.long = long;
        this.chance = chance;
        this.population = population;
        // TODO: population is unused atm, also some sort of lifespan must be added, probs set to 14 days


        this.circle = new window.google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.3,
            map,
            center: {lat: this.lat, lng: this.long},
            radius: population,
        });
    }

    // boolean, update is like a question
    update() {
        let chance = Math.random();
        return (chance < this.chance);
    }

    // get a new point on the map close to this one
    getSpread(maxRadius) {
        return {lat: this.lat + this.spread(maxRadius), long: this.long + this.spread(maxRadius)};
    }

    spread(radius) {
        // console.log((Math.random() - 0.5) * radius);
        return (Math.random() - 0.5) * radius;
    }

    // Draw me
    draw() {
        return this.circle;
    }
}
