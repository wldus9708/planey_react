import React, { Component } from 'react';
import './Map.css';

class KakaoMapExample extends Component {
    constructor() {
        super()

        this.markers = []
        this.map = null
        this.ps = null
        this.infowindow = null
        this.keyword = ''
        this.isCalled = false
    }

    componentDidMount() {
        this.script = document.createElement('script')

        this.script.async = true
        this.script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services&appkey=d3e105462a91f8f012d0047526ef090a`
        document.head.appendChild(this.script)

        this.script.onload = () => {
            window.kakao.maps.load(() => {
                this.loadOption()
            })
        }
    }

    componentWillUnmount(){
        document.head.removeChild(this.script)
    }

    loadOption = () => {
        const mapContainer = document.getElementById('map')

        const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };


        this.map = new window.kakao.maps.Map(mapContainer, mapOption);

        const mapTypeControl = new window.kakao.maps.MapTypeControl();

        this.map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new window.kakao.maps.ZoomControl();
        this.map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        this.ps = new window.kakao.maps.services.Places();
        this.infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    }

    searchPlaces = () => {
        if (!this.keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }

        this.ps.keywordSearch(this.keyword, this.placesSearchCB);
    }

    placesSearchCB = (data, status, pagination) => {
        if (this.isCalled) {
            return
        }

        this.isCalled = true

        setTimeout(() => this.isCalled = false, 3000)

        if (status === window.kakao.maps.services.Status.OK) {
            this.displayPlaces(data);

            this.displayPagination(pagination);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
        } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    }

    displayPlaces = (places) => {
        const listEl = document.getElementById('placesList')
        const menuEl = document.getElementById('menu_wrap')
        const fragment = document.createDocumentFragment()
        const bounds = new window.kakao.maps.LatLngBounds()

        this.removeAllChildNods(listEl);

        this.removeMarker();

        console.log({ places }, places.length)

        for (let i = 0; i < places.length; i++) {
            const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x)
            const marker = this.addMarker(placePosition, i)
            const itemEl = this.getListItem(i, places[i]);

            bounds.extend(placePosition);

            const title = places[i].place_name

            window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                this.displayInfowindow(marker, title);
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                this.infowindow.close();
            });

            itemEl.onmouseover = () => {
                this.displayInfowindow(marker, title);
            };

            itemEl.onmouseout = () => {
                this.infowindow.close();
            };

            fragment.appendChild(itemEl);
        }

        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        this.map.setBounds(bounds);
    }

    getListItem = (index, places) => {
        const el = document.createElement('li')
        let itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
            '<div class="info">' +
            '   <h5>' + places.place_name + '</h5>';

        if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>' +
                '   <span class="jibun gray">' + places.address_name + '</span>';
        } else {
            itemStr += '    <span>' + places.address_name + '</span>';
        }

        itemStr += '  <span class="tel">' + places.phone + '</span>' +
            '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
    }

    addMarker = (position, idx, title) => {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'
        const imageSize = new window.kakao.maps.Size(36, 37)
        const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, (idx * 46) + 10),
            offset: new window.kakao.maps.Point(13, 37)
        }
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)

        const marker = new window.kakao.maps.Marker({
            position: position,
            image: markerImage
        });

        marker.setMap(this.map);
        this.markers.push(marker);

        return marker;
    }

    removeMarker = () => {
        this.markers.forEach((e, i) => {
            this.markers[i].setMap(null);
        })

        this.markers = [];
    }

    displayPagination = (pagination) => {
        const paginationEl = document.getElementById('pagination')
        const fragment = document.createDocumentFragment()

        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
        }

        let elList = []

        for (let i = 1; i <= pagination.last; i++) {
            elList[i] = document.createElement('button')
            elList[i].innerHTML = i;

            if (i === pagination.current) {
                elList[i].className = 'on'
            }

            elList[i].onclick = async () => {
                elList.forEach((_,i) => {
                    elList[i].className = 'off'
                })

                elList[i].className = 'on'

                const res = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?page=${i}&size=15&sort=accuracy&query=${this.keyword}`, {
                    headers: {
                        'Authorization': `d3e105462a91f8f012d0047526ef090a`
                    }
                })

                const json = await res.json()

                this.displayPlaces(json['documents'])
            }

            fragment.appendChild(elList[i]);
        }
        paginationEl.appendChild(fragment);
    }

    displayInfowindow = (marker, title) => {
        const content = `<div style="padding:5px;z-index:1;">${title}</div>`

        this.infowindow.setContent(content);
        this.infowindow.open(this.map, marker);
    }

    removeAllChildNods = (el) => {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    }

    render() {
        return (
            <>
                <div id='map' style={{ width: '100vw', height: '100vh' }} />
                <div id="menu_wrap" className="bg_white">
                    <div className="option">
                        <div>
                            키워드 : <input type="text" onChange={(e) => this.keyword = e.target.value} size="15" />
                            <button onClick={() => this.searchPlaces()}>검색하기</button>
                        </div>
                    </div>
                    <hr />
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
            </>
        )
    }
}

export default KakaoMapExample;
