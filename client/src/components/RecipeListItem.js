import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ModalOverlay from '../containers/ModalOverlay';
import ModalConfirm from './ModalConfirm';
import { deleteRecipe } from '../actions';

function RecipeListItem({ recipe, deleteRecipe }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  function toggleModal() {
    setShowDeleteModal((state) => !state);
  }

  return (
    <>
      <div className="ui top bottom attached header RecipeListItem__header">
        {recipe.name}
        <div>
          <Link
            to={`/my-collections/${recipe._collection}/edit-recipe/${recipe._id}`}
            className="ui button"
          >
            Edit
          </Link>
          <button className="ui button" onClick={toggleModal}>
            Delete
          </button>
        </div>
      </div>
      <div className="ui attached segment">
        <div className="RecipeListItem__top-box">
          <div className="RecipeListItem__img-box">
            <img src={`/api/recipes/${recipe._id}/image`} alt={recipe.name} />
          </div>
          <div>
            <table
              className="ui celled table"
              style={{ textTransform: 'capitalize' }}
            >
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map(({ _id, name, quantity }) => {
                  return (
                    <tr key={_id} className="item">
                      <td data-label="Ingredient">{name}</td>
                      <td date-label="Quantity">{quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <h3 className="ui header">Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
      <ModalOverlay show={showDeleteModal}>
        <ModalConfirm
          headerText="Delete recipe"
          onCancel={toggleModal}
          onConfirm={() => deleteRecipe(recipe._id)}
        >
          <p>Are you sure you want to delete this recipe?</p>
        </ModalConfirm>
      </ModalOverlay>
    </>
  );
}

export default connect(null, { deleteRecipe })(RecipeListItem);
