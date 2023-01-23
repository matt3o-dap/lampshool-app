import  moment from 'moment'

export function converti (mese) 
    {
        switch (mese)
        {
            case 1 : 
                return "Gen";

            case 2 : 
                return "Feb";

            case 3 : 
                return "Mar";

            case 4 : 
                return "Apr";

            case 5 : 
                return "Mag";

            case 6 : 
                return "Giu";

            case 7 : 
                return "Lug"

            case 8 : 
                return "Ago";

            case 9 : 
                return "Set";

            case 10 : 
                return "Ott";

            case 11 : 
                return "Nov";

            case 12 : 
                return "Dic";
        }
    }

export function controlla (dataTime, arr)
    {
        for (var i = 0; i < arr.length; i++)
        {
            var y = 0
            let plus = moment(arr [i] ['x']).add(1, 'day').format('YYYY-MM-DD');
            let minus = moment(arr [i] ['x']).subtract(1, 'day').format('YYYY-MM-DD');
            if (moment(dataTime).isAfter(minus) && moment(dataTime).isBefore(plus))
            {   
               return i;        
            }
        }
        return false;
    }

export function aggiungiVotiFisarmonica (dataTime, data) {
        var c = []
        var flag = false
        var stringa = ""
        for (var j = 0; j < data.length; j++)
        {

            if (dataTime.getDate () == data [j] ['x'].getDate())
            {
                if (dataTime.getMonth () == data [j] ['x'].getMonth())
                {
                    flag = true
                    stringa += data [j] ['y'] + '\n';
                }
            }
        }

        if (flag == false) 
        {
            stringa = "NON CI SONO VOTI"; 
        }
        return stringa;
    }

export function creaArray (data) 
{
    const arr = [];
    var indice = 0;
    for (var i = 0; i < data.length; i++)
    {
        if (i == 0)
        {
            arr.push ({
                x : data [i] ['x'],
                y : data [i] ['y'],
            })
        }
        else
        {
            if (arr [arr.length - 1] ['x'].getTime() == data [i] ['x'].getTime())
            {
                arr [indice] ['y'] = calcolaMedia (arr, data [i] ['y'], i, data);
            }
            else
            {
                indice = indice + 1;
                arr.push ({
                    x : data [i] ['x'],
                    y : calcolaMedia (arr, data [i] ['y'], i, data)
                })
            }
        }
    }
    return arr;
}

function calcolaMedia (arr, nuovoVoto, i, data)
{
    var media = 0;
    for (var j = 0; j < i; j++)
    {
        media += data [j] ['y'];
    }

    media += nuovoVoto;
    var g = i+1
    media = media / g

    return media;
}