const h = document.querySelector('.info_period')
const DateFrom = document.getElementById('DateFrom')
const TimeFrom = document.getElementById('TimeFrom')
const DateTo = document.getElementById('DateTo')
const TimeTo = document.getElementById('TimeTo')
//Получаем координаты
async function getDate(){
    let response = await fetch('http://localhost:5000/get-info-data')
    const Cords =  await response.json()
    return Cords
}

//Изменение формы даты
function Time(unixTimestamp, key){
    let date = new Date(unixTimestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = date.getFullYear();
    // const month = months[date.getMonth()];
    let month = date.getMonth();
    if(month<10) {
        month = `0${month}`
    }
    let dt = date.getDate();
    if(dt<10) {
        dt = `0${dt}`
    }
    let hours = date.getHours();
    if(hours<10) {
        hours = `0${hours}`
    }
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime = `${year}-${month}-${dt} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    if(key){
        return formattedTime
    }
    else{
        return [`${year}-${month}-${dt}`, `${hours}:${minutes.substr(-2)}`]
    }
}

function getNextVal(arr, val) {
    // omit the next line if the array is always sorted:
    arr = arr.slice(0).sort(function(a,b){return a-b;});

    for (var i=0; i < arr.length; i++){
        if (arr[i].ts >= val){
            return arr[i];
        }
    }
    
    // return default value when val > all values in array
}
function GetUnixTS(date, time){
    var myDate = `${date}`;
    var myTime = `${time}`;
    myTime = myTime.split(':')
    myDate = myDate.split("-");
    var newDate = new Date(myDate[0], myDate[1], myDate[2], myTime[0], myTime[1]);
    return newDate.getTime() / 1000
}

var myMap
//Получение данных поиска
const FindBtn = document.getElementById('find')
FindBtn.addEventListener('click',async function(){
    
    
    DateFromTS = GetUnixTS(DateFrom.value, TimeFrom.value)
    DateToTS = GetUnixTS(DateTo.value, TimeTo.value)

    const Cords = await getDate()
    
    let From = getNextVal(Cords, DateFromTS)
    let To = getNextVal(Cords, DateToTS)
    if(From && To){
        const test = Cords.filter((element)=>{
            return element.ts > From.ts && element.ts < To.ts
        })
        myMap.destroy();
        
                    // Создание карты.
                    myMap = new ymaps.Map("map", 
                    {
                        // Координаты центра карты.
                        // Порядок по умолчанию: «широта, долгота».
                        // Чтобы не определять координаты центра карты вручную,
                        // воспользуйтесь инструментом Определение координат.
                        center: [56.3342212, 44.0626601],
                        // Уровень масштабирования. Допустимые значения:
                        // от 0 (весь мир) до 19.
                        zoom: 7,
                        
                    });
    
                    myPieChart = new ymaps.Placemark([
                        55.847, 37.
                    ],);
    
                    var i = 0;
                    var ArrCords = [[]]
                    for (let cord of test){
                        
                        ArrCords[i] = [cord.lat, cord.long]
                        // myMap.geoObjects.add(new ymaps.Placemark([cord.lat, cord.long], {
                        //     balloonContent: Time(cord.ts),
                        // }, {
                        //     preset: 'islands#blueCircleDotIconWithCaption',
                        //     iconCaptionMaxWidth: '50'
                        // }))
                        i++
                    }
                    
                    // Создаем ломаную с помощью вспомогательного класса Polyline.
                    var myPolyline = new ymaps.Polyline([
                        // Указываем координаты вершин ломаной.
                        ...ArrCords
                    ], {
                        // Описываем свойства геообъекта.
                        // Содержимое балуна.
                        balloonContent: "Ломаная линия"
                    }, {
                        // Задаем опции геообъекта.
                        // Отключаем кнопку закрытия балуна.
                        balloonCloseButton: false,
                        // Цвет линии.
                        strokeColor: "#000000",
                        // Ширина линии.
                        strokeWidth: 4,
                        // Коэффициент прозрачности.
                        strokeOpacity: 0.5
                    });
    
                    // Добавляем линию на карту.
                    myMap.geoObjects.add(myPolyline);
    }
    else(
        console.log('Неправильные границы')
    )
})

async function SetTime(){
    const Cords = await getDate()
    //Вывод времененных границ отслеживания
    let TimeFrom = Time(Cords[0].ts, 1)
    let TimeTo = Time(Cords[499].ts, 1)
    
    h.textContent = `${TimeFrom} - ${TimeTo}`  
    Test = Time(Cords[0].ts, 0)
    DateFrom.min = Test[0]
    DateTo.min = Test[0]
    TimeFrom.min = Test[1]
    Test = Time(Cords[499].ts, 0)
    DateFrom.max = Test[0]
    DateTo.max = Test[0]
    TimeTo.max = Test[1]
}

// Функция ymaps.ready() будет вызвана, когда
            // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
            ymaps.ready(init);
            async function init(){

                const Cords = await getDate()
                //Вывод времененных границ отслеживания
                let TimeFrom = Time(Cords[0].ts, 1)
                let TimeTo = Time(Cords[499].ts, 1)
                
                h.textContent = `${TimeFrom} - ${TimeTo}`  
                SetTime()
                // const test = Cords.filter((element)=>{
                //     return element.ts > Cords[200].ts && element.ts < Crods[300].ts
                // })
                
                // console.log(test)
                // Создание карты.
                myMap = new ymaps.Map("map", 
                {
                    // Координаты центра карты.
                    // Порядок по умолчанию: «широта, долгота».
                    // Чтобы не определять координаты центра карты вручную,
                    // воспользуйтесь инструментом Определение координат.
                    center: [56.3342212, 44.0626601],
                    // Уровень масштабирования. Допустимые значения:
                    // от 0 (весь мир) до 19.
                    zoom: 7,
                    
                });

                myPieChart = new ymaps.Placemark([
                    55.847, 37.
                ],);

                var i = 0;
                var ArrCords = [[]]
                for (let cord of Cords){
                    
                    ArrCords[i] = [cord.lat, cord.long]
                    // myMap.geoObjects.add(new ymaps.Placemark([cord.lat, cord.long], {
                    //     balloonContent: Time(cord.ts),
                    // }, {
                    //     preset: 'islands#blueCircleDotIconWithCaption',
                    //     iconCaptionMaxWidth: '50'
                    // }))
                    i++
                }
                
                // Создаем ломаную с помощью вспомогательного класса Polyline.
                var myPolyline = new ymaps.Polyline([
                    // Указываем координаты вершин ломаной.
                    ...ArrCords
                ], {
                    // Описываем свойства геообъекта.
                    // Содержимое балуна.
                    balloonContent: "Ломаная линия"
                }, {
                    // Задаем опции геообъекта.
                    // Отключаем кнопку закрытия балуна.
                    balloonCloseButton: false,
                    // Цвет линии.
                    strokeColor: "#000000",
                    // Ширина линии.
                    strokeWidth: 4,
                    // Коэффициент прозрачности.
                    strokeOpacity: 0.5
                });

                // Добавляем линию на карту.
                myMap.geoObjects.add(myPolyline);
                
            }


            
