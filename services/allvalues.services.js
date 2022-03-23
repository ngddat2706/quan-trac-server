const { AllStations, AllValues } = require("../models/allstations.model");

async function addValue(params, callback){
    if(params.Id === undefined){
        return callback(
            {
                message: "Id Station Required",
            },
            ""
        );
    } 

    const station = new AllValues(params);
    station.save()
    .then(async (response)=>{
        try{
            await AllStations.updateOne({Id: params.Id},{$set:{Value: response}});
            return callback(null, response);
        }
        catch(error){
            return callback(error);
        }
        
    })
    .catch((error)=>{
        return callback(error);
    });
}


async function getValue(params, callback){
    if(params.stationId === undefined){
        return callback({ message: "stationId Required",},"");
    }
    if(params.pageNum === undefined){
        return callback({ message: "pageNum Required",},"");
    }
    if(params.pageSize === undefined){
        return callback({ message: "pageSize Required",},"");
    }
    if(params.interval === undefined){
        return callback({ message: "interval Required",},"");
    }
    if(params.startTime === undefined){
        return callback({ message: "startTime Required",},"");
    }
    if(params.endTime === undefined){
        return callback({ message: "endTime Required",},"");
    }

    try {
        const allValues = await AllValues.find({
            Id: params.stationId,
            ReceivedTime: {
                $gte: params.startTime,
                $lte: params.endTime,
            } 
        });
       const pagination={
            PreviousUrl: "",
            PreviousPages: [],
            NextUrl: "",
            NextPages: [],
        };
        var ValueLenght = allValues.length;
        // Take Page Count
        var pageCount = Math.ceil(ValueLenght / params.pageSize);

        // Take All Values
        var indexStart = (params.pageNum-1) * params.pageSize;
        var indexEnd = indexStart+ 20;
        const TakeValue = allValues.splice(indexStart, indexEnd);

        // Take Pagination
        if(params.pageNum > 1) pagination.PreviousUrl = getUrl(params, params.pageNum-1);
        const pageNumStart = (params.pageNum - 3 <= 0? 1: (params.pageNum - 3));
        for (let i = pageNumStart; i <  params.pageNum; i++) {
            const Page = {
                PageNum: i,
                PageUrl: getUrl(params, i),
            };
            pagination.PreviousPages.push(Page);
        }
        if(params.pageNum < pageCount) pagination.NextUrl = getUrl(params, Number(params.pageNum) +1);
        for (let i = 1; i <= 3; i++) {
            const Page = {
                PageNum: Number(params.pageNum) + i,
                PageUrl: getUrl(params, Number(params.pageNum) + i),
            };
            pagination.NextPages.push(Page);
        }

        return callback(null, pageCount, TakeValue, pagination);
    }
    catch(error){
        return callback(error);
    }
}

function getUrlbyParams(params){
    const Url = "/api/Values/GetAll?"
            +"stationId="+ params.stationId
            +"&pageNum=" + params.pageNum
            +"&pageSize=" + params.pageSize
            +"&interval=" + params.interval
            +"&startTime="+ params.startTime
            +"&endTime="+ params.endTime;
            
    return Url
}

function getUrl(params, pageNum){
    const Url = "/api/Values/GetAll?"
            +"stationId="+ params.stationId
            +"&pageNum=" + pageNum
            +"&pageSize=" + params.pageSize
            +"&interval=" + params.interval
            +"&startTime="+ params.startTime
            +"&endTime="+ params.endTime;
            
    return Url
}



module.exports = {
    addValue,
    getValue,
};