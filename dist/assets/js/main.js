class materialJunk {
    constructor() {
        this.junkList = 'assets/js/junklist.js';
        this.materialList = 'assets/js/materiallist.js';
        this.jsonResponse = '';
        this.selectContainer = document.getElementById('materialselect');
        this.junkContainer = document.getElementById('junklist');
    }

    init() {
        this.buildSelect( this.materialList );
        // listen for select field change
        document.addEventListener('change', () => {
            const materialSelect = document.getElementById('materialselect').value;
            this.getFiltered(materialSelect);
        });
    }

    // build the select options
    buildSelect(jsonArr) {
        fetch(jsonArr)
        .then(res => res.json())
        .then((data) => {
            this.selectContainer.innerHTML += "<option value='' selected disabled>Select Material</option>";

            data.forEach(element => {
                this.selectContainer.innerHTML += `<option value="${element.name}">${element.name}</option>`;
            });
        })
        .catch(err => { throw err });
    }

    // filter only the items we want
    getFiltered(term) {
        fetch(this.junkList)
        .then(res => res.json())
        .then((data) => {            
            let data_filter = data.filter( element => element.materials[0].includes(term))
            this.listJunk(data_filter);
        })
        .catch(err => { throw err });
    }

    // list out junk in html
    listJunk(filtered) {
        let data_output = '',
        junkEl = this.junkContainer;
        junkEl.innerHTML = '';

        data_output += '<table>';
        data_output += '<thead class="table-header"><tr><th>Name</th><th>Wgt</th><th>Val</th><th>Material</th></tr></thead><tbody>';

        filtered.forEach( item => {
            data_output += 
            `<tr>
            <td>${item.name}</td>
            <td>${item.weight}</td>
            <td>${item.value}</td>
            <td>${item.materials.join(', ')}</td>
            </tr>`;
        });

        data_output += '</tbody></table>';

        junkEl.innerHTML = data_output;
    }
}

const myClass = new materialJunk();
myClass.init();