
class Serializer {

    private neededData:any[];
    constructor(neededData:any[]) {
        this.neededData = neededData;
    }

    public serialize(data:any){
        let serializedData:any = {};
        for(let item of this.neededData){
            if(data[item]){
                serializedData[item] = data[item];
            }else {
                console.error(`${item} does not exist.`);
                break;
            }
        }
        return serializedData;
    }

    public dump(data:any[]) {
        let serializedData:any[] = [];
        for(let item of data){
            serializedData.push(this.serialize(item));
        }
        return serializedData;
    }
}

export default Serializer;