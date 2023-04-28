import * as Api from "../api.js";
const allCheckBtn = document.querySelector(".btn-select-all");
const allCheckBtnIcon = document.querySelector(".btn-select-all i");

const labels = document.querySelectorAll(".form-check label");
const productListContainer = document.querySelector(".product-list");

if (!sessionStorage.getItem("isAdmin")) {
  location.href = "/";
}
const products = await getProducts();
async function getProducts() {
  try {
    const products = await Api.get("/api/products/all");
    renderProducts(products);
  } catch (e) {
    alert(e.message);
  }
}

function renderProducts(products) {
  productListContainer.innerHTML = "";
  products.forEach((product) => {
    const {
      _id,
      imagePaths,
      productName,
      purchaseNum,
      category,
      price,
      stock,
      discountRate,
    } = product;
    productListContainer.innerHTML += `

  <div class="product-container">
  <div class="form-check">
    <input
      class="form-check-input btn-select"
      type="checkbox"
      id="product1Checked"
    />

    <label class="form-check-label" for="product1Checked">
      <i class="bi bi-check-circle fs-4"></i>
    </label>
  </div>
  <div class="order-item shadow-sm p-3 bg-body-tertiary rounded">
    <div class="product-info">
      <div class="product-img">
         <img src=../../${imagePaths[0]} alt="${productName} 이미지" /> 
      </div>
      <div class="product-detail">
        <h4 >${productName}</h4>
        <p>상품 가격 ${price}원</p> 
        <p>할인율 ${discountRate}%</p>
        <p>재고 ${stock}</p>
        <p>구매수 ${purchaseNum}</p>
      </div>
    </div>

    <div class="order-item-btn-container">
      <button type="button" class="btn btn-outline-success btn-modify" data-id="${_id}">
        수정
      </button>
      <button type="button" class="btn btn-outline-success btn-delete" data-id="${_id}" >
        삭제
      </button>
    </div>
  </div>
</div>`;
  });
}

const productContainers = document.querySelectorAll(".product-container");
const checkBtnIcons = document.querySelectorAll(".form-check i");
const checkBtns = document.querySelectorAll(".form-check .btn-select");

// 전체 선택 버튼 클릭 이벤트
allCheckBtn.addEventListener("click", handleAllCheck);

productContainers.forEach((productContainer) => {
  productContainer.addEventListener("click", handleCheck);
});

async function handleAllCheck(e) {
  if (allCheckBtnIcon.className.split(" ")[1] === "bi-check-circle") {
    allCheckBtnIcon.className = "bi bi-check-circle-fill fs-4";
  } else {
    allCheckBtnIcon.className = "bi bi-check-circle fs-4";
  }

  checkBtnIcons.forEach((checkBtnIcon) => {
    if (allCheckBtnIcon.className.split(" ")[1] === "bi-check-circle-fill") {
      checkBtnIcon.className = "bi bi-check-circle-fill fs-4";
    } else {
      checkBtnIcon.className = "bi bi-check-circle fs-4";
    }
  });
}

// 개별 상품 선택 버튼 클릭 이벤트
function handleCheck(e) {
  if (e.target.classList.contains("btn-delete")) {
    const productId = e.target.dataset.id;
    const isDelete = confirm("정말 삭제하시겠습니까?");
    if (isDelete) {
      deleteProduct(productId);
    }
  }
  // if (e.target.checked) {
  //   e.target.nextElementSibling.querySelector("i").className =
  //     "bi bi-check-circle-fill fs-4";
  // } else {
  //   e.target.nextElementSibling.querySelector("i").className =
  //     "bi bi-check-circle fs-4";
  // }
  // if (document.querySelectorAll(".form-check input:checked").length === 0) {
  //   allCheckBtnIcon.className = "bi bi-check-circle fs-4";
  // }
}

function deleteProduct(productId) {
  try {
    const res = Api.delete(`/api/products/admin/${productId}`);
    location.reload();
  } catch (e) {
    alert(e.message);
  }
}
