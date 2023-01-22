"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Serializer {
    constructor(neededData) {
        this.neededData = neededData;
    }
    serialize(data) {
        let serializedData = {};
        for (let item of this.neededData) {
            if (data[item]) {
                serializedData[item] = data[item];
            }
            else {
                console.error(`${item} does not exist.`);
                break;
            }
        }
        return serializedData;
    }
    dump(data) {
        let serializedData = [];
        for (let item of data) {
            serializedData.push(this.serialize(item));
        }
        return serializedData;
    }
}
exports.default = Serializer;
