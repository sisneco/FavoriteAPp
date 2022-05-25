//basicContents

//favo
let favoElement = document.getElementById('favo');
favoElement.addEventListener("click",()=>{
  const latLngData={
     "lat":document.getElementById("currentLat").textContent,
     "lng":document.getElementById("currentLng").textContent,
     "address":document.getElementById("address").textContent,
  }

  let jsonData = JSON.stringify(latLngData);

  const submitElement = document.getElementsByTagName("form");
    submitElement.item(0).setAttribute("value",jsonData);

    document.favoForm.submit();
});

//googleMapContents
//initial
let map,marker,geocoder,geoLatLng;
const initialLatLng={lat:34.5,lng:135.8};

//googleMapsAPI funciton
function initMap(){

  map = new google.maps.Map(document.getElementById('map'),{
    center:initialLatLng,
    zoom:6,
  });

  map.addListener("click",function(e){
    getClickLatLng(e.latLng,map);
  });

  const currentBtn = document.getElementById('currentBtn');

  currentBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) =>{
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          geoLatLng = new google.maps.LatLng(pos.lat,pos.lng);
          geocoder = new google.maps.Geocoder();

          geocoder.geocode({latLng:geoLatLng},(results,status)=>{
            latLngSearch(results,status,pos);
          })
        },
        () =>{
          console.log("error");
        }
      );
    }else{
      console.log("error");
    }
  });

}

//search_button
let searchBtn = document.getElementsByClassName("btn btn-flat");
searchBtn.item(0).addEventListener("click",()=>{

    const searchValue = document.getElementsByClassName("i_text");
    //経緯度
    const pos = {
      lng:Number(searchValue.item(0).value),
      lat:Number(searchValue.item(1).value),
    };
    const searchAddress = searchValue.item(2).value;//住所
    //フォームクリア処理
    for(let i = 0;i <3;i++){
        searchValue.item(i).value='';
    }
  if(isNaN(pos.lat)|| isNaN(pos.lng)){
    console.log("damedayo");
  }

  geocoder = new google.maps.Geocoder();

if(searchAddress == ""){
  geoLatLng = new google.maps.LatLng(pos.lat,pos.lng);
  geocoder.geocode({latLng:geoLatLng},(results,status)=>{
    latLngSearch(results,status,pos);
  });
}
else{
  geocoder.geocode({address:searchAddress},(reusults,status)=>{
    addressSearch(reusults,status);
  })
}
});

//経緯度検索
function latLngSearch(results,status,pos){
  let adress = "";

  if(status == google.maps.GeocoderStatus.OK){
    address = results[0].formatted_address.replace(/^日本、/,'');
    const addressText = document.getElementById('address');
    addressText.textContent = address;
    //DOM
    const lngText = document.getElementById('currentLng');
    const latText = document.getElementById('currentLat');
    lngText.textContent = pos.lng;
    latText.textContent = pos.lat;

    //mapの中心を再設定
    map.center = pos;
    map.zoom = 15;

    //マーカー設置
    if(marker != null){
      marker.setMap(null);
    }
    marker = new google.maps.Marker({
      position:pos,
      map:map,
    });

    map.setCenter(pos);
  }
  else{
    console.log("error");
  }
}
//住所検索
function addressSearch(results,status,pos){
  address ="";

  if(status == google.maps.GeocoderStatus.OK){
    if(results[0].geometry){
      const pos = {
        lat : results[0].geometry.location.lat(),
        lng : results[0].geometry.location.lng(),
      }

      address = results[0].formatted_address.replace(/^日本、/,'');
      const addressText = document.getElementById('address');
      addressText.textContent = address;
      //DOM
      const lngText = document.getElementById('currentLng');
      const latText = document.getElementById('currentLat');
      lngText.textContent = pos.lng;
      latText.textContent = pos.lat;

      //mapの中心を再設定
      map.center = pos;
      map.zoom = 15;

      //マーカー設置
      if(marker != null){
        marker.setMap(null);
      }
      marker = new google.maps.Marker({
        position:pos,
        map:map,
      });
      map.setCenter(pos);
    }
    else{
      console.log("error");
    }
  }
}

function getClickLatLng(lat_lng,map){
  //DOM
  const lngText = document.getElementById('currentLng');
  const latText = document.getElementById('currentLat');

  const pos = {
    lat:lat_lng.lat(),
    lng:lat_lng.lng(),
  };

  geoLatLng = new google.maps.LatLng(pos.lat,pos.lng);
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({latLng:geoLatLng},(results,status)=>{
    latLngSearch(results,status,pos);
  });
}
