// Modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal
var img = document.getElementById("sharedCanvas");
img.onclick = function() {
  modal.style.display = "block";
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Add functionality to the buttons
document.getElementById("viewOrdiScan").onclick = async function() {
    let currentCatId = catId; // Replace this with the actual current cat ID
    try {
        let ordiScanUrl = await getOrdiScanUrl(currentCatId);
        document.getElementById("ordiScanLink").href = ordiScanUrl;
        // No need to call window.open or closeModal here
    } catch (error) {
        console.error("Error getting OrdiScan URL:", error);
        // Handle error (e.g., show a message to the user)
    }
}

document.getElementById("downloadCat").onclick = function() {
  var canvas = document.getElementById("sharedCanvas");
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = 'my_quantumcat.png';
  link.href = image;
  link.click();
  closeModal();
}

//Close Modal
function closeModal() {
    var modal = document.getElementById('imageModal'); // Replace with your actual modal ID
    modal.style.display = "none";
}


// Get ordiscan ULR
async function loadInscriptionData() {
    try {
        const response = await fetch('cats.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading inscription data:", error);
        return null;
    }
}

async function getOrdiScanUrl(catId) {
    const inscriptionData = await loadInscriptionData();
    if (!inscriptionData) {
        return "https://ordiscan.com"; // Fallback URL in case of error
    }

    let inscription = inscriptionData.find(item => item.cat_id === catId);
    if (inscription) {
        return `https://ordiscan.com/inscription/${inscription.inscription_number}`;
    } else {
        return "https://ordiscan.com"; // Fallback URL if catId not found
    }
}

// Utility functions
document.addEventListener("DOMContentLoaded", function() {
    adjustImageContainerSize();
    window.addEventListener('resize', adjustImageContainerSize);
});

function adjustImageContainerSize() {
    var imageContainer = document.getElementById('dynamic-images-container');
    if (imageContainer) {
        var width = imageContainer.offsetWidth;
        imageContainer.style.height = width + 'px';
    }
}

function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
document.addEventListener('DOMContentLoaded', function() {
    setViewportHeight(); // Set the initial viewport height
});


// Loading Cats
let catId = "cat0000";
let layersData = new Array(40).fill(null);
const layerHashes = ["445e3695047139623c160ca1dc62db80234aac3d68b20a64c7b4982f9b58d7bfi0", "8abc1e5e864f948e20d4392e66d1c058ac8b7d408bcd6906434a958ba63fb8abi0", "8e0bc8acf4657ebb8aa8e0e3ca5bce923ec0b2cf6a5740649b82dcd2e6d37bbfi0", "c30a5766f26b2d9c0cabab26b0893be77fa520d0909a145b1b1c68b6a104a89ei0", "0147fcd7fc07f38c049ef1406cbc3791a1ff99e4a47ae775699cfbaaebed4a73i0", "68aca2303d1d72c1e67a0a8c984b903f2dc53251b5413cb2e675b24f8791b372i0", "123bed4b082084286059eb5129bb0d8991bf5f9597fa9afc593b64c60039e27fi0", "c7c7ec152cf08b03c42ab82939e4bf3327fb34ca9e57f1471f31b0cac6c73672i0", "1e886b750ab13926e46f3b2d08ea9f071b0a0126802dfa6f2b4d9a49cabfd281i0", "d9c6902d70d45dbc501c3feded93e585a495efe101546404fcc474c3d07cb716i0", "0a71d90e808e3ab17fa04f19d9fa0fa3e3c5c3393b5f8edb387a39fbfa42ac37i0", "bf3fc9c8b518d5027a90d4b72e37c9ed4eaaf364f5e21143c2ea3ff641a842f6i0", "ec6cdd4db49e577180b9e0afad299502ec7840cee5daab25eee9a58a382951c5i0", "bf540f284fbc743cc188dfa090b9acdd061298a34048f3cee3c9007f234a7b5fi0", "ad6a41e8d0974402a657fe58ae7337b2bca470d694c5b16d366c1685f7d8706di0", "4059843e80ee5ff817fe0c4a07d7963a04dbe4c32d6e70d946448313d196c1fai0", "d520f6da7424656906af8928489a6ea386a5b94b3b58cf4c21a717af0ae0ef89i0", "6f1af95293860f99f02fcb4c5740f396b51f53a788516a4e331795caaf75dcd8i0", "07bbf1184d58e49e730def7776c050670b0368f7c55d44d0da355ef3d8454f7fi0", "2c81f73180ef35a073231f38e2651442ff9c138467a1af787600d5a48def78a9i0", "9b980285b33616668c008b278792d032e78b5fc79e77b4189f2544e6b043b26fi0", "383467579e0f5c6e9c1f15f1c64438a69cf100dfbe8cf509b6b3dd1e1ebe448ci0", "9a5b48bc465d4ce9951e07cbf8fb3189815e3ab34070ac8b6d303fb140c80446i0", "8deef3801fac418f284a705030157af0a54a7c1cceae823ea944dd5532ac54c1i0", "dfa7797e9d1a73657c419c52943d83108037a4a24ab205b2dc9105d3bbef4131i0", "938ff6bc5264fbd435b38c0004e4b20af5a336ebe17fa902d53079bbdc4d8cd1i0", "4fc85ba932240e9e4f05268e1d983d15eb991fcc26e95ddbe437c187fd4a73b7i0", "7d9e59a2845d052afc68b5fa8a4fc7c85155617ee354c29177752fcf09ab1480i0", "d1b6e4159d44ae450094c5e4ced9116e7ef841891ac9366a924afd36eceb7065i0", "acba94836c4233f1e31f8ea141b22ed2fcac742c39b3e40a225df8dd82909574i0", "07c3c197783ef1aa0a907004310067aae2fb098d676bc861d67cafd605d1fd54i0", "dc349df26778bd4745646a4385f543a2f1fb3a6f30a3faf1ca707c63bb38279ci0", "f507a0bd2b1d89c4751cb99b17e41b5d6e34f763c681fdfdee25ef4e31f6f82ai0", "2fd10119a501e19fa7d833b48f34f3607b3687005393b54fcc4665f7d9e89132i0", "50d68204f9bf58d594089c2f4078a2520e992342b434ef0abb3933f751352bf1i0", "da1bc6b24f3a1fafd3324985fc70796e833523ba55a54bb5095b216eae1c7b47i0", "22eacef5d361d31653aa326c8f6aa1ee58b42ae2b5ffd222177da0dc258e9241i0", "f5bd7a72eeda40fcd9b8393fb5b7e3f800e535f1dd4611495b79bf1569d4fe66i0", "6ce851b4b24a95f71cc2ccfef51d4d9dd1c4b2f65635963164bdb6cccc45ee05i0", "466dc5011b5c0d483c7f90b64d469a66e9c91b7d1b9febf39b6bfa6715183d37i0"]

class FetchQueue {
    constructor(maxConcurrent) {
        this.queue = [];
        this.maxConcurrent = maxConcurrent;
        this.running = 0;
        this.totalTasks = 0;
        this.completedTasks = 0;
        this.onComplete = null
    }
    enqueue(task) {
        this.queue.push(task);
        this.totalTasks++;
        this.processQueue()
    }
    processQueue() {
        if (this.running >= this.maxConcurrent || this.queue.length === 0) {
            return
        };
        this.running++;
        const a = this.queue.shift();
        a().finally(() => {
            this.running--;
            this.completedTasks++;
            this.checkCompletion();
            this.processQueue()
        })
    }
    onAllCompleted(callback) {
        this.onComplete = callback;
        this.checkCompletion()
    }
    checkCompletion() {
        if (this.completedTasks === this.totalTasks && this.onComplete) {
            this.onComplete()
        }
    }
}
async function fetchWithRetry(a, b, c) {
    for (let d = 0; d < b; d++) {
        try {
            const e = await fetch(a);
            if (e.ok) {
                return e
            } else if (e.status === 404) {
                //console.log("404 ERROR!", e.status, e.statusText);
                throw new Error('Resource not found (404)')
            } else {
                //console.error("None 404 ERROR!", e.status, e.statusText);
                throw new Error('HTTP error')
            }
        } catch (e) {
            if (d === b - 1 || e.message === 'Resource not found (404)') {
                //console.error("Max retries reached or 404 returned!", e);
                throw e
            };
            const f = Math.random() * 100;
            await new Promise(g => setTimeout(g, c + f));
            if (c < 500) {
                c *= 2
            } else {
                c = 1000
            }
        }
    }
}
async function decryptImage(a, b, c) {
    try {
        const d = new Uint8Array(b.match(/.{1,2}/g).map(h => parseInt(h, 16)));
        const e = new Uint8Array(c.match(/.{1,2}/g).map(h => parseInt(h, 16)));
        const f = await window.crypto.subtle.importKey('raw', d, {
            name: 'AES-GCM'
        }, false, ['decrypt']);
        const g = await window.crypto.subtle.decrypt({
            name: 'AES-GCM',
            iv: e
        }, f, a);
        return new Blob([g], {
            type: 'image/png'
        })
    } catch (d) {
        throw d
    }
}
async function loadLayer(a, b) {
    const c = await fetchWithRetry("https://ordiscan.com/content/" + b, 10, 50);
    const d = await c.json();
    const e = d.layerMap;
    const f = d.layerTraitMap;
    const g = d.layerHexKey;
    const h = d.layerHexIV;
    if (!e.hasOwnProperty(a) || !f.hasOwnProperty(e[a])) {
        return null
    };
    const i = f[e[a]];
    const j = "https://ordiscan.com/content/" + i;
    return fetchWithRetry(j, 10, 50).then(k => k.arrayBuffer()).then(k => decryptImage(k, g, h)).catch(k => null)
}

function initiateLayerLoading() {
    const fetchQueue = new FetchQueue(50);

    for (let i = 0; i < layerHashes.length; i++) {
        fetchQueue.enqueue(() => loadLayer(catId, layerHashes[i])
            .then(imageBlob => {
                if (imageBlob) {
                    layersData[i] = imageBlob;
                    const button = document.getElementById('layer' + (i + 1));
                    button.classList.remove('inactive');
                    button.classList.add('active');
                    button.textContent = 'Layer ' + (i + 1);
                } else {
                    // Handle the case where loadLayer returns null
                    const button = document.getElementById('layer' + (i + 1));
                    if (button) {
                        button.disabled = true;
                        button.textContent = 'Trait Not Available';
                    }
                }
            })
            .catch(error => {
                console.error("error from loadLayer", error);
                // Disable the button for the layer that failed to load or is not available
                const button = document.getElementById('layer' + (i + 1));
                if (button) {
                    button.disabled = true;
                    button.textContent = 'Not Inscribed';
                }
            }));
    }
    fetchQueue.onAllCompleted(() => {
        renderLayers();
    });
}


// Function to render layers based on button states
function renderLayers() {
    const canvas = document.getElementById("sharedCanvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear existing drawing

    layersData.forEach((layerBlob, index) => {
        // Check if the layer data exists, then draw it
        if (layerBlob) {
            const objectURL = URL.createObjectURL(layerBlob);
            const img = new Image();
            img.onload = function () {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(objectURL);
            };
            img.src = objectURL;
        }
    });
}

function clearLayersData() {
    layersData.fill(null);
    resetButtons(); // New function call to reset buttons
    const canvas = document.getElementById("sharedCanvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}
document.addEventListener("DOMContentLoaded", function () {

    // Define adjustCanvasSize function here or before this script
    function adjustCanvasSize() {
        const dynamicImagesContainer = document.getElementById("dynamic-images-container");
        const width = dynamicImagesContainer.offsetWidth;
        const height = dynamicImagesContainer.offsetHeight;
        const size = 600;
        const sharedCanvas = document.getElementById("sharedCanvas");
        sharedCanvas.width = Math.min(width, size);
        sharedCanvas.height = Math.min(height, size);
    }

    adjustCanvasSize(); // Now we can safely call it
    loadCatEventSetup();
    createLayerButtons();
    initiateLayerLoading();
});

// Sets up the event listener for the 'Load Cat' button, unchanged
function loadCatEventSetup() {
    document.getElementById('loadCatButton').addEventListener('click', function () {
        catId = 'cat' + document.getElementById('catIdInput').value;
        closeModal();
        clearLayersData();
        initiateLayerLoading();
    });
}

// Update createLayerButtons function to add 'inactive' class by default
function createLayerButtons() {
    const container = document.getElementById('checkboxContainer');
    container.innerHTML = ''; // Clear the container before adding new buttons

    for (let i = 1; i <= 40; i++) {
        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('layer-button');

        let button = document.createElement('button');
        button.id = 'layer' + i;
        button.textContent = 'Layer ' + i;
        button.classList.add('inactive'); // Add 'inactive' class by default
        button.addEventListener('click', function () {
            toggleLayerVisibility(i); // Updated to call the correct toggle function
        });

        buttonDiv.appendChild(button);
        container.appendChild(buttonDiv);
    }
}

// Resets button states, new function to replace resetCheckboxesAndLabels
function resetButtons() {
    for (let i = 1; i <= 40; i++) {
        let button = document.getElementById('layer' + i);
        if (button) {
            button.disabled = false;
            button.classList.remove('disabled'); // Update the class if you use one for styling disabled buttons
        }
    }
}

function toggleLayerVisibility(index) {
    // Adjust index since array is 0-based and buttons are 1-based
    index -= 1;
    const button = document.getElementById('layer' + (index + 1));

    // Check if the layer is already shown, then hide it; otherwise, show it
    if (layersData[index]) {
        layersData[index] = null;
        button.classList.remove('active');
        button.classList.add('inactive');
    } else {
        // Load the layer again since it was set to null
        loadLayer(catId, layerHashes[index]).then(imageBlob => {
            if (imageBlob) {
                layersData[index] = imageBlob;
                button.classList.remove('inactive');
                button.classList.add('active');
                renderLayers(); // Re-render the layers
            } else {
                alert('Layer ' + (index + 1) + ' is not available.');
            }
        });
    }
    renderLayers(); // Call this to immediately reflect the change on canvas
}