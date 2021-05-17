import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getAllCategory,
  update_Category,
  deleteCategory,
} from "../../actions/categoryActions";
import ShowSpinner from "../../components/UI/Spinner";
import Input from "../../components/UI/Input";

import "./style.css";

const Category = () => {
  const [name, setName] = useState("");
  const [expanded, setExpanded] = useState([]);
  const [checked, setChecked] = useState([]);
  const [parent, setParent] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const handleModalClose = () => {
    setShow(false);
  };

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("parentId", parent);
    form.append("categoryPicture", categoryImage);

    dispatch(createCategory(form));
    setShow(false);
  };
  const handleShow = () => {
    setName("");
    setParent("");
    setCategoryImage("");
    setShow(true);
  };

  const handleCategoryUpdateModalClose = () => {
    setUpdateCategory(false);
  };

  const handleDeleteModalShow = () => {
    updateCheckAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const handleDeleteCategoryClose = () => {
    setDeleteCategoryModal(false);
  };

  const handleDeleteCategoryConfirmed = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    expandedIdsArray.concat(checkedIdsArray);
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategory(checkedIdsArray));
      setDeleteCategoryModal(false);
    }
  };

  const handleUpdateCategory = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("type", item.type);
      form.append("parentId", item.parentId ? item.parentId : "");
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("type", item.type);
      form.append("parentId", item.parentId ? item.parentId : "");
    });
    dispatch(update_Category(form));
    setUpdateCategory(false);
  };

  const updateCheckAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryUpdateModalShow = () => {
    updateCheckAndExpandedCategories();
    setUpdateCategory(true);
  };

  const catergoryImageHandler = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push({
        label: category.name,
        value: category._id,
        children:
          category && category.children && category.children.length > 0
            ? renderCategories(category.children)
            : null,
      });
    }
    return categoryList;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        type: category.type,
        parentId: category.parentId,
      });
      if (category && category.children && category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const renderCreateCategoryModal = () => {
    return (
      <>
        {/*ADD A NEW CATEGORY MODAL*/}
        <Modal show={show} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type={"text"}
              label="Category Name"
              placeholder="Category Name"
            />

            <select
              style={{ marginBottom: "10px" }}
              value={parent}
              onChange={(e) => setParent(e.target.value)}
              className="form-control"
            >
              <option>select category</option>
              {category &&
                category.categories &&
                createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
            </select>

            <Input
              onChange={(e) => catergoryImageHandler(e)}
              type="file"
              name="Category Image"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const renderUpdateCategoryModal = () => {
    return (
      <>
        {/** CATEGORY EDIT AND UPDATE MODAL */}
        <Modal
          size="lg"
          show={updateCategory}
          onHide={handleCategoryUpdateModalClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Categories</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {expandedArray.length > 0 && (
              <Row>
                <Col>
                  {" "}
                  <h6>Expanded Categories</h6>
                </Col>
              </Row>
            )}
            {expandedArray.length > 0 &&
              expandedArray.map((item, index) => (
                <Row key={index}>
                  <Col>
                    <Input
                      value={item.name}
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                      type={"text"}
                      placeholder="Category Name"
                    />
                  </Col>
                  <Col>
                    <select
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parentId",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                      className="form-control"
                    >
                      <option>select category</option>
                      {category &&
                        category.categories &&
                        createCategoryList(category.categories).map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.name}
                            </option>
                          )
                        )}
                    </select>
                  </Col>
                  <Col>
                    <select
                      value={item.type}
                      onChange={(e) =>
                        handleCategoryInput(
                          "type",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                      className="form-control"
                    >
                      <option value="">Select Type</option>
                      <option value="Store">Store</option>
                      <option value="Product">Product</option>
                      <option value="Page">Page</option>
                    </select>
                  </Col>
                </Row>
              ))}
            {checkedArray.length > 0 && (
              <Row>
                <Col>
                  {" "}
                  <h5>Checked Categories</h5>
                </Col>
              </Row>
            )}
            {checkedArray.length > 0 &&
              checkedArray.map((item, index) => (
                <Row key={index}>
                  <Col>
                    <Input
                      value={item.name}
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                      type={"text"}
                      placeholder="Category Name"
                    />
                  </Col>
                  <Col>
                    <select
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parentId",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                      className="form-control"
                    >
                      <option>select category</option>
                      {category &&
                        category.categories &&
                        createCategoryList(category.categories).map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.name}
                            </option>
                          )
                        )}
                    </select>
                  </Col>
                  <Col>
                    <select
                      value={item.type}
                      onChange={(e) =>
                        handleCategoryInput(
                          "type",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                      className="form-control"
                    >
                      <option value="">Select Type</option>
                      <option value="Store">Store</option>
                      <option value="Product">Product</option>
                      <option value="Page">Page</option>
                    </select>
                  </Col>
                </Row>
              ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleUpdateCategory}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const renderDeleteCategory = () => {
    return (
      <Modal show={deleteCategoryModal} onHide={handleDeleteCategoryClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {expandedArray && expandedArray.length > 0 && (
            <h5>Expanded Categories</h5>
          )}
          {expandedArray &&
            expandedArray.map((item, index) => (
              <React.Fragment key={index}>
                {" "}
                <span>{item.name}</span>
                {"   "}
              </React.Fragment>
            ))}
          {checkedArray && checkedArray.length > 0 && (
            <h5>Checked Categories</h5>
          )}
          {checkedArray &&
            checkedArray.map((item, index) => (
              <React.Fragment key={index}>
                {" "}
                <span>{item.name}</span>
                {"   "}
              </React.Fragment>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCategoryClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDeleteCategoryConfirmed}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h5>Manage Product Category</h5>
              <Button
                style={{ marginTop: "10px" }}
                variant="primary"
                onClick={handleShow}
              >
                Add Category
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {category.loading ? (
              <ShowSpinner />
            ) : (
              <>
                {category && category.categories && (
                  <>
                    <CheckboxTree
                      style={{ fontSize: "20px" }}
                      nodes={renderCategories(category.categories)}
                      checked={checked}
                      expanded={expanded}
                      onCheck={(checked) => setChecked(checked)}
                      onExpand={(expanded) => setExpanded(expanded)}
                      icons={{
                        check: <IoIosCheckbox />,
                        uncheck: <IoIosCheckboxOutline />,
                        halfCheck: <IoIosCheckboxOutline />,
                        expandClose: <IoIosArrowForward />,
                        expandOpen: <IoIosArrowDown />,
                      }}
                    />
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              style={{ marginTop: "10px" }}
              variant="primary"
              onClick={handleCategoryUpdateModalShow}
            >
              Edit
            </Button>{" "}
            <Button
              style={{ marginTop: "10px" }}
              variant="danger"
              onClick={handleDeleteModalShow}
            >
              Delete
            </Button>{" "}
          </Col>
        </Row>
      </Container>
      {renderDeleteCategory()}
      {renderCreateCategoryModal()}
      {renderUpdateCategoryModal()}
    </Layout>
  );
};

export default Category;
