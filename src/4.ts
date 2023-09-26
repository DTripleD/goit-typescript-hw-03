class Key {
  private signature: number;
  constructor() {
    this.signature = Math.floor(Math.random() * 1000);
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean;
  protected key: Key;
  protected tenants: Person[] = [];

  constructor(key: Key) {
    this.door = false;
    this.key = key;
  }

  abstract openDoor(key: Key): void;

  comeIn(person: Person): void {
    if (
      this.door &&
      this.key.getSignature() === person.getKey().getSignature()
    ) {
      this.tenants.push(person);
      console.log(`Welcome home, ${person.getKey().getSignature()}!`);
    } else {
      console.log("Access denied!");
    }
  }
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (this.key.getSignature() === key.getSignature()) {
      this.door = true;
      console.log("Door is open!");
    } else {
      console.log("Wrong key! Door remains closed.");
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

export {};
