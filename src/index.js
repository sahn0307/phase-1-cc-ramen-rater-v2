// index.js
const url = "http://localhost:3000/ramens"
//!    
//json-server --watch db.json
//global dom element variables
const menu = document.querySelector('#ramen-menu');
const form = document.querySelector('#new-ramen');
const updateForm = document.querySelector('#edit-ramen');
const detailImage = document.querySelector('#ramen-detail .detail-image');
const name = document.querySelector('#ramen-detail .name');
const restaurant = document.querySelector('#ramen-detail .restaurant');
const rating = document.querySelector('#rating-display');
const comment = document.querySelector('#comment-display');

// Callbacks
//! display elements when user clicks on menu items
const handleClick = (ramen) => {
  //! select elements (moved to global scope)
  // const detailImage = document.querySelector('#ramen-detail .detail-image');
  // const name = document.querySelector('#ramen-detail .name');
  // const restaurant = document.querySelector('#ramen-detail .restaurant');
  // const rating = document.querySelector('#rating-display');
  // const comment = document.querySelector('#comment-display');

  //! update the elements
  detailImage.src = ramen.image;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  rating.textContent = ramen.rating;
  comment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  // const form = document.querySelector('#new-ramen'); global scoped
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    //! create new ramen from form
    const newRamen = {
      name: document.querySelector('#new-name').value,
      restaurant: document.querySelector('#new-restaurant').value,
      image: document.querySelector('#new-image').value,
      rating: document.querySelector('#new-rating').value,
      comment: document.querySelector('#new-comment').value,
    };

    //! add new ramen to menu
    // const menu = document.querySelector('#ramen-menu'); global scoped
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    menu.appendChild(img);

    //! clear form after submit
    form.reset();
  });
};
  
//! Show all ramen images in the div "ramen-menu" 
const displayRamens = () => {
  fetch(url)
    .then(resp => resp.json())
    .then(ramens => {
      // const menu = document.querySelector('#ramen-menu'); global scoped
      //! clear menu?
      //menu.innerHTML = '';

      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.id = ramen.id; 
        //! save id to use for handleClick
        img.addEventListener('click', () => handleClick(ramen));
        menu.appendChild(img);

        //! display firstRamen when page loads
        handleClick(ramens[0]);

      });
    });
};

const addUpdateListener = () => {
  // const updateForm = document.querySelector('#edit-ramen'); global scoped
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    // store new data from form
    const newRating = document.querySelector('#edit-rating').value;
    const newComment = document.querySelector('#edit-comment').value;
    
    // update data in the DOM
    rating.textContent = newRating;
    comment.textContent = newComment;
  });
};


//! Invoke Functions
const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
  // Invoke addUpdateListener
  addUpdateListener();

};

main();





//Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

