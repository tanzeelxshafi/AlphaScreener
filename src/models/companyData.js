import mongoose,{Schema} from 'mongoose';

const Results=new Schema(
    {
            v:{ 
                type:Number,
                required: true
            },
            vw:{ 
                type:Number,
                required: true
            },
            o:{ 
                type:Number,
                required: true
            },
            c:{ 
                type:Number,
                required: true
            },
            h:{ 
                type:Number,
                required: true
            },
            l:{ 
                type:Number,
                required: true
            },
            t:{ 
                type:Number,
                required: true
            },
            n:{ 
                type:Number,
                required: true
            }
    }
)
const compData=new Schema({
    ticker: {
        type: String,
        required: true
    },
    results: [
        Results
    ]
});


const compStock=mongoose.model("compStock",compData)

export default compStock;
// {
//     "ticker": "AAPL",
//     "queryCount": 1,
//     "resultsCount": 1,
//     "adjusted": true,
//     "results": [
//         {
//             "v": 64531178,
//             "vw": 213.1428,
//             "o": 211.5,
//             "c": 213.25,
//             "h": 214.86,
//             "l": 210.64,
//             "t": 1719374400000,
//             "n": 769036
//         }
//     ],
//     "status": "OK",
//     "request_id": "5bf769f77e3105072382c576b938503b",
//     "count": 1
// }