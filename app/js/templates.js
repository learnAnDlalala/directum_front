export const showRooms = async (roomArray)=> {
    const tmpl = document.getElementById('roomListTmpl').content;
    const roomsList = document.querySelector('rooms_list_row');
    const clone = tmpl.cloneNode(true).querySelector('.room');
    await roomArray.forEach(el => {
        clone.innerText = el.name;
        roomsList.appendChild(clone.cloneNode(true));
    });
}

