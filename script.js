// Page setup
let catId = "cat0000";
let layersData = new Array(40).fill(null);
const layerHashes = ["445e3695047139623c160ca1dc62db80234aac3d68b20a64c7b4982f9b58d7bfi0", "8abc1e5e864f948e20d4392e66d1c058ac8b7d408bcd6906434a958ba63fb8abi0", "8e0bc8acf4657ebb8aa8e0e3ca5bce923ec0b2cf6a5740649b82dcd2e6d37bbfi0", "c30a5766f26b2d9c0cabab26b0893be77fa520d0909a145b1b1c68b6a104a89ei0", "0147fcd7fc07f38c049ef1406cbc3791a1ff99e4a47ae775699cfbaaebed4a73i0", "68aca2303d1d72c1e67a0a8c984b903f2dc53251b5413cb2e675b24f8791b372i0", "123bed4b082084286059eb5129bb0d8991bf5f9597fa9afc593b64c60039e27fi0", "c7c7ec152cf08b03c42ab82939e4bf3327fb34ca9e57f1471f31b0cac6c73672i0", "1e886b750ab13926e46f3b2d08ea9f071b0a0126802dfa6f2b4d9a49cabfd281i0", "d9c6902d70d45dbc501c3feded93e585a495efe101546404fcc474c3d07cb716i0", "0a71d90e808e3ab17fa04f19d9fa0fa3e3c5c3393b5f8edb387a39fbfa42ac37i0", "bf3fc9c8b518d5027a90d4b72e37c9ed4eaaf364f5e21143c2ea3ff641a842f6i0", "ec6cdd4db49e577180b9e0afad299502ec7840cee5daab25eee9a58a382951c5i0", "bf540f284fbc743cc188dfa090b9acdd061298a34048f3cee3c9007f234a7b5fi0", "ad6a41e8d0974402a657fe58ae7337b2bca470d694c5b16d366c1685f7d8706di0", "4059843e80ee5ff817fe0c4a07d7963a04dbe4c32d6e70d946448313d196c1fai0", "d520f6da7424656906af8928489a6ea386a5b94b3b58cf4c21a717af0ae0ef89i0", "6f1af95293860f99f02fcb4c5740f396b51f53a788516a4e331795caaf75dcd8i0", "07bbf1184d58e49e730def7776c050670b0368f7c55d44d0da355ef3d8454f7fi0", "2c81f73180ef35a073231f38e2651442ff9c138467a1af787600d5a48def78a9i0", "9b980285b33616668c008b278792d032e78b5fc79e77b4189f2544e6b043b26fi0", "383467579e0f5c6e9c1f15f1c64438a69cf100dfbe8cf509b6b3dd1e1ebe448ci0", "9a5b48bc465d4ce9951e07cbf8fb3189815e3ab34070ac8b6d303fb140c80446i0", "8deef3801fac418f284a705030157af0a54a7c1cceae823ea944dd5532ac54c1i0", "dfa7797e9d1a73657c419c52943d83108037a4a24ab205b2dc9105d3bbef4131i0", "938ff6bc5264fbd435b38c0004e4b20af5a336ebe17fa902d53079bbdc4d8cd1i0", "4fc85ba932240e9e4f05268e1d983d15eb991fcc26e95ddbe437c187fd4a73b7i0", "7d9e59a2845d052afc68b5fa8a4fc7c85155617ee354c29177752fcf09ab1480i0", "d1b6e4159d44ae450094c5e4ced9116e7ef841891ac9366a924afd36eceb7065i0", "acba94836c4233f1e31f8ea141b22ed2fcac742c39b3e40a225df8dd82909574i0", "07c3c197783ef1aa0a907004310067aae2fb098d676bc861d67cafd605d1fd54i0", "dc349df26778bd4745646a4385f543a2f1fb3a6f30a3faf1ca707c63bb38279ci0", "f507a0bd2b1d89c4751cb99b17e41b5d6e34f763c681fdfdee25ef4e31f6f82ai0", "2fd10119a501e19fa7d833b48f34f3607b3687005393b54fcc4665f7d9e89132i0", "50d68204f9bf58d594089c2f4078a2520e992342b434ef0abb3933f751352bf1i0", "da1bc6b24f3a1fafd3324985fc70796e833523ba55a54bb5095b216eae1c7b47i0", "22eacef5d361d31653aa326c8f6aa1ee58b42ae2b5ffd222177da0dc258e9241i0", "f5bd7a72eeda40fcd9b8393fb5b7e3f800e535f1dd4611495b79bf1569d4fe66i0", "6ce851b4b24a95f71cc2ccfef51d4d9dd1c4b2f65635963164bdb6cccc45ee05i0", "466dc5011b5c0d483c7f90b64d469a66e9c91b7d1b9febf39b6bfa6715183d37i0"]
let catIndex = new Map();
let evolutionIndex = new Map();

async function initializePage() {
    await Promise.all([buildIndex(), buildEvolutionIndex()]); // Load both indexes
    updateOrdiScanUrl(); // Update the OrdiScan URL
    createLayerButtons(); // Now that evolution data is available, create layer buttons
    initiateLayerLoading(); // Start loading layers
    loadCatEventSetup();
    populateEvolutionDropdown(); // Populate evolution dropdown
    //Initialize Layer Button with the highest layer
    document.getElementById('showEvolutions').textContent = (getHighestEvolutionState(catId) + 1);
}

// Call the function to initialize the page
initializePage();

//Function that updates the OrdiScan URL ///////////////////////////
async function updateOrdiScanUrl() {
    let currentCatId = catId; // Replace with your actual cat ID variable
    try {
        let ordiScanUrl = await getOrdiScanUrl(currentCatId);
        document.getElementById("ordiScanLink").href = ordiScanUrl;
    } catch (error) {
        console.error("Error getting OrdiScan URL:", error);
        // Handle error, maybe set href to a fallback URL or disable the link
    }
}

function getOrdiScanUrl(catId) {
    if (catIndex.size === 0) {
        console.error("Index not built yet");
        return "https://ordiscan.com"; // Fallback URL in case index is not ready
    }

    const inscription = catIndex.get(catId);
    if (inscription) {
        return `https://ordiscan.com/inscription/${inscription.inscription_number}`;
    } else {
        return "https://ordiscan.com"; // Fallback URL if catId not found
    }
}
////////////////////////////////////////////////////////////////////////

//Functions that load and prepare the evolutions json ///////////////////////////
async function loadEvolutionData() {
    try {
        const response = await fetch('cat_evolution.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading evolution data:", error);
        return null;
    }
}

// Function to build an index for evolution data
async function buildEvolutionIndex() {
    const evolutionData = await loadEvolutionData();

    if (evolutionData) {
        Object.keys(evolutionData).forEach(catId => {
            let catEvolutions = new Map();
            evolutionData[catId].forEach((stateArray, stateIndex) => {
                catEvolutions.set(stateIndex, stateArray);
            });
            evolutionIndex.set(catId, catEvolutions);
        });
    }

    return evolutionIndex;
}

function getHighestEvolutionState(catId) {
    if (evolutionIndex.has(catId)) {
        const evolutions = evolutionIndex.get(catId);
        let maxEvolutionState = 0;
        for (let stateIndex of evolutions.keys()) {
            if (stateIndex > maxEvolutionState) {
                maxEvolutionState = stateIndex;
            }
        }
        return maxEvolutionState;
    }
    return 0; // Default to 0 if no evolutions are found
}
/////////////////////////////////////////////////////////////////////////////////

document.getElementById("downloadCat").onclick = function () {
    const imageLoadPromises = layersData.map((layerData, index) => {
        if (!layerData) return Promise.resolve(null); // Skip if no data

        const img = new Image();
        let src;
        // Determine if layerData is a Blob or a direct URL string
        if (typeof layerData === 'string') {
            // Direct URL string, use as is
            src = layerData;
        } else {
            // Blob, create an object URL
            src = URL.createObjectURL(layerData);
        }

        return new Promise((resolve) => {
            img.onload = () => {
                resolve({ img, index });
                if (typeof layerData !== 'string') {
                    // Only revoke URL if it was created from a Blob
                    URL.revokeObjectURL(src);
                }
            };
            img.crossOrigin = 'Anonymous'; // Ensure cross-origin images are loaded correctly
            img.src = src;
        });
    });

    // Wait for all images to load
    Promise.all(imageLoadPromises).then((loadedImages) => {
        // Create an off-screen canvas with desired size
        const offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = 600; // Set desired output width
        offScreenCanvas.height = 600; // Set desired output height
        const offScreenContext = offScreenCanvas.getContext('2d');

        // Sort and draw images on the off-screen canvas
        loadedImages.filter(imgObj => imgObj).sort((a, b) => a.index - b.index).forEach(imgObj => {
            offScreenContext.drawImage(imgObj.img, 0, 0, offScreenCanvas.width, offScreenCanvas.height);
        });

        // Convert the off-screen canvas to a data URL and trigger download
        offScreenCanvas.toBlob((blob) => {
            const newImgUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = newImgUrl;
            link.download = 'my_quantumcat.png'; // Set the download filename
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link); // Clean up
            URL.revokeObjectURL(newImgUrl); // Clean up
        }, 'image/png');
    });
};


////////////////////////////////////////////////////////////////////////

//Create index for faster loading //////////////////////////////////
async function buildIndex() {
    const data = await loadInscriptionData();
    if (data) {
        data.forEach(item => {
            catIndex.set(item.cat_id, item);
            catIndex.set(item.inscription_number, item);
            catIndex.set(item.inscription_id, item);
        });
    }
}

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
//////////////////////////////////////////////////////////////////


// Utility functions to set viewport height and adjust image container size
document.addEventListener("DOMContentLoaded", function () {
    adjustImageContainerSize();
    window.addEventListener('resize', adjustImageContainerSize);
});

function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
document.addEventListener('DOMContentLoaded', function () {
    setViewportHeight(); // Set the initial viewport height
});

function adjustImageContainerSize() {
    const viewportHeight = window.innerHeight;
    const catDisplayContainer = document.getElementById('cat-display-container');
    const statusBarHeight = document.querySelector('.status-bar').offsetHeight;

    // Maximum height that the catDisplayContainer can take, factoring in the statusBar height
    const maxContainerHeight = (viewportHeight * 0.4) - statusBarHeight;

    // Get the current width of the catDisplayContainer
    let containerWidth = catDisplayContainer.offsetWidth;

    if (containerWidth > maxContainerHeight) {
        // Reduce size to not exceed 40% of the viewport height minus statusBar height
        catDisplayContainer.style.width = maxContainerHeight + 'px';
    } else if (containerWidth < maxContainerHeight) {
        // Increase size up to 40% of the viewport height or until CSS max-width is reached
        catDisplayContainer.style.width = maxContainerHeight + 'px';
    }

    // Set the height of the image container to keep it square
    const imageContainer = document.getElementById('dynamic-images-container');
    imageContainer.style.width = catDisplayContainer.style.width;
    imageContainer.style.height = catDisplayContainer.style.width; // Keep it square
}

// Run the function on initial load and on window resize
window.onload = adjustImageContainerSize;
window.onresize = adjustImageContainerSize;

//////////////////////////////////////////////////////////////////////////////


// Drop-Down ////////////////////////////////////////////////////////////////////////
function populateEvolutionDropdown() {
    const dropdown = document.getElementById('evolutionDropdown');
    const showEvolutionsButton = document.getElementById('showEvolutions');

    if (evolutionIndex && evolutionIndex.has(catId)) {
        const evolutions = evolutionIndex.get(catId);

        // Clear existing items and add new ones
        dropdown.innerHTML = '';
        evolutions.forEach((_, evolutionIndex) => {
            let item = document.createElement('div');
            item.textContent = 'Evolution ' + (evolutionIndex + 1); // +1 for human-readable format

            // Add click event listener to each dropdown item
            item.addEventListener('click', function () {
                // Update the button text to the selected evolution number
                showEvolutionsButton.textContent = evolutionIndex + 1;
                updateCatForEvolutionState(evolutionIndex);
                dropdown.style.display = 'none';
            });

            dropdown.appendChild(item);
        });
    } else {
        // Handle the case where there's no evolution data for the cat
        showEvolutionsButton.textContent = '0'; // No evolutions available
    }
}
// Event listener for the 'showEvolutions' button
document.getElementById('showEvolutions').addEventListener('click', function () {
    var dropdown = document.getElementById('evolutionDropdown');
    dropdown.style.display = dropdown.style.display === "none" || dropdown.style.display === "" ? "block" : "none";
});

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('#showEvolutions')) {
        var dropdown = document.getElementById('evolutionDropdown');
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
};
///////////////////////////////////////////////////////////////////////////////////////////

// Update Evolutions //////////////////////////////////////////////////////////////////////
async function updateCatForEvolutionState(evolutionStateIndex) {
    if (!evolutionIndex.has(catId)) {
        console.error("No evolution data for cat:", catId);
        return;
    }

    const evolutionData = evolutionIndex.get(catId).get(evolutionStateIndex);
    if (!evolutionData) {
        console.error("No data for evolution state:", evolutionStateIndex);
        return;
    }

    // Update the 'showEvolutions' button text
    const showEvolutionsButton = document.getElementById('showEvolutions');
    showEvolutionsButton.textContent = evolutionStateIndex + 1; // +1 for human-readable format

    // Prepare an array to hold promises for layer loading
    let layerLoadPromises = [];

    // Iterate over evolutionData to determine which layers to update
    for (let i = 0; i < evolutionData.length; i++) {
        // Only load layers that are marked as "True" and are not already loaded
        if (evolutionData[i] === "True" && !layersData[i]) {
            // Push the layer loading promise into the array
            layerLoadPromises.push(loadLayer(catId, layerHashes[i]).then(imageBlob => {
                if (imageBlob) {
                    layersData[i] = imageBlob;
                }
            }));
        } else if (evolutionData[i] !== "True") {
            // Ensure the layer is set to null if not used 
            layersData[i] = null;
        }
    }

    // Wait for all layer loading promises to resolve
    await Promise.all(layerLoadPromises);

    // Set button states based on the loaded evolution state
    setButtonState(evolutionStateIndex);

    // Now that all layers are loaded, render them on the canvas
    await renderLayers();
}


function setButtonState(evolutionStateIndex) {
    // Ensure we have the evolution data for the current cat
    if (!evolutionIndex.has(catId)) {
        console.error("No evolution data for cat:", catId);
        return;
    }

    // Get the evolution data for the given state and the highest state
    const currentEvolutionData = evolutionIndex.get(catId).get(evolutionStateIndex);
    const highestEvolutionStateIndex = getHighestEvolutionState(catId);
    const highestEvolutionData = evolutionIndex.get(catId).get(highestEvolutionStateIndex);

    if (!currentEvolutionData || !highestEvolutionData) {
        console.error("No data for evolution state:", evolutionStateIndex, "or highest evolution state");
        return;
    }

    // Iterate through each button and set its state based on currentEvolutionData
    currentEvolutionData.forEach((state, index) => {
        const button = document.getElementById('layer' + (index + 1));
        if (button) {
            if (state === "True") {
                button.classList.remove('inactive');
                button.classList.add('active');
                button.disabled = false;
                button.textContent = 'Layer ' + (index + 1);
            } else if (state === "False") {
                if (index + 1 == 29) {
                    button.classList.add('inactive');
                    button.classList.remove('active');
                    button.disabled = true;
                    button.textContent = 'No Cape';
                } else {
                    button.classList.add('inactive');
                    button.classList.remove('active');
                    button.disabled = true;
                    button.textContent = 'Trait Not Available';
                }
            } else {
                button.classList.add('inactive');
                button.classList.remove('active');
                button.disabled = highestEvolutionData[index] !== "True";
                button.textContent = highestEvolutionData[index] === "True" ? 'Layer ' + (index + 1) : 'Not Inscribed';
            }
        }
    });
}

///////////////////////////////////////////////////////////////////////////////////////////

// Button handling //////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////


// Functions to update cat name display
function updateCatNameDisplay(catId) {
    const catNameDisplay = document.querySelector('.cat-name');
    if (catNameDisplay) {
        catNameDisplay.textContent = catId; // Update the text content with the new cat ID
    }
}

// Ordinals code for loading layers /////////////////////////////////////////////////
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
                        if (i + 1 == 29) {
                            button.disabled = true;
                            button.textContent = 'No Cape';
                        } else {
                            button.disabled = true;
                            button.textContent = 'Trait Not Available';
                        }
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

// Load random cat //////////////////////////////////////////////////////////////////////
function loadRandomCat() {
    clearLayersData();
    const fetchQueue = new FetchQueue(50);

    for (let i = 0; i < layerHashes.length; i++) {
        catId = "cat" + Math.floor(Math.random() * 3333).toString().padStart(4, '0');
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
                        if (i + 1 == 29) {
                            button.disabled = true;
                            button.textContent = 'No Cape';
                        } else {
                            button.disabled = true;
                            button.textContent = 'Trait Not Available';
                        }
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
        updateCatNameDisplay("cat????");
    });
}

// Load custom cat //////////////////////////////////////////////////////////////////////
function loadCustomCat() {
    clearLayersData();
    const fetchQueue = new FetchQueue(50);

    for (let i = 0; i < layerHashes.length; i++) {
        if (i === 3) { // Special handling for layer 3
            const imageUrl = 'https://i.ibb.co/wzDFRW2/lerry.png';
            layersData[i] = imageUrl; // Directly use the URL for layer 3
            const button = document.getElementById('layer' + (i + 1));
            button.classList.remove('inactive');
            button.classList.add('active');
            button.textContent = 'Layer ' + (i + 1);
            continue; // Skip the rest of the loop for layer 3
        }

        catId = "cat" + Math.floor(Math.random() * 3333).toString().padStart(4, '0');
        fetchQueue.enqueue(() => loadLayer(catId, layerHashes[i])
            .then(imageBlob => {
                if (imageBlob) {
                    // Assuming loadLayer returns a Blob; no change needed for other layers
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
                        button.textContent = i + 1 == 28 ? 'No Cape' : 'Trait Not Available'; // Adjusted for direct comparison
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
        updateCatNameDisplay("LARRY");
    });
}

// Load custom cat //////////////////////////////////////////////////////////////////////
function loadCustomCat2() {
    clearLayersData();
    const fetchQueue = new FetchQueue(50);

    for (let i = 0; i < layerHashes.length; i++) {
        if (i === 3) { // Special handling for layer 3
            const imageUrl = 'https://i.ibb.co/wzDFRW2/lerry.png';
            layersData[i] = imageUrl; // Directly use the URL for layer 3
            const button = document.getElementById('layer' + (i + 1));
            button.classList.remove('inactive');
            button.classList.add('active');
            button.textContent = 'Layer ' + (i + 1);
            continue; // Skip the rest of the loop for layer 3
        }

        //catId = "cat" + Math.floor(Math.random() * 3333).toString().padStart(4, '0');
        fetchQueue.enqueue(() => loadLayer(catId, layerHashes[i])
            .then(imageBlob => {
                if (imageBlob) {
                    // Assuming loadLayer returns a Blob; no change needed for other layers
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
                        button.textContent = i + 1 == 28 ? 'No Cape' : 'Trait Not Available'; // Adjusted for direct comparison
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
        updateCatNameDisplay("LARRY");
    });
}


function renderLayers() {
    const canvas = document.getElementById("sharedCanvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear existing drawing

    const imageLoadPromises = layersData.map((layerData, index) => {
        if (!layerData) return Promise.resolve(null); // Skip if no data

        const img = new Image();
        let src;
        // Determine if layerData is a Blob or a direct URL string
        if (typeof layerData === 'string') {
            // Direct URL string, use as is
            src = layerData;
        } else {
            // Blob, create an object URL
            src = URL.createObjectURL(layerData);
        }

        return new Promise((resolve) => {
            img.onload = () => {
                resolve({ img, index });
                if (typeof layerData !== 'string') {
                    // Only revoke URL if it was created from a Blob
                    URL.revokeObjectURL(src);
                }
            };
            img.src = src;
        });
    });

    // Wait for all images to load
    return Promise.all(imageLoadPromises).then((loadedImages) => {
        // Sort images by original index to maintain order
        loadedImages.filter(imgObj => imgObj).sort((a, b) => a.index - b.index).forEach(imgObj => {
            context.drawImage(imgObj.img, 0, 0, canvas.width, canvas.height);
        });
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
});

// Sets up the event listener for the 'Load Cat' button, unchanged
function loadCatEventSetup() {
    document.getElementById('loadCatButton').addEventListener('click', async function () {
        const input = document.getElementById('catIdInput').value;

        if (input.toLowerCase() === "nothing was done") {
            loadRandomCat();
        } else if (input.toLowerCase() === "fink") {
            loadCustomCat();
        } else if (input.toLowerCase() === "fink me") {
            loadCustomCat2();
        } else {
            catId = await getCatIdFromInput(input);

            if (catId) {
                updateCatNameDisplay(catId);
                updateOrdiScanUrl();
                clearLayersData();

                // Determine the highest available evolution state
                const highestEvolutionState = getHighestEvolutionState(catId);

                // Update the cat for this evolution state
                await updateCatForEvolutionState(highestEvolutionState);

                // Update Buttons
                console.log("debug " + (highestEvolutionState + 1));
                setButtonState((highestEvolutionState + 1));

                // Update the showEvolutions button
                const showEvolutionsButton = document.getElementById('showEvolutions');
                showEvolutionsButton.textContent = highestEvolutionState + 1; // +1 for human-readable format

                // Optionally, update the dropdown if it needs to reflect the new cat's data
                populateEvolutionDropdown();
            } else {
                console.error("Invalid cat ID:", input);
                // Handle invalid cat ID if needed
            }

        }


    });
}

function getCatIdFromInput(input) {
    if (catIndex.size === 0) {
        console.error("Index not built yet");
        return null;
    }

    // If the input is 1-4 digits, it's treated as a cat ID
    if (/^\d{1,4}$/.test(input)) {
        input = 'cat' + input.padStart(4, '0');
    }

    const catEntry = catIndex.get(input);
    return catEntry ? catEntry.cat_id : null;
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