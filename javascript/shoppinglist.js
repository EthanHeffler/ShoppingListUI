const itemInput = $('.item-input');
const priceInput = $('.price-input');
const shoppingListDiv = $('.shopping-list');
const totalPriceDiv = $('.total-price');

const getShoppingList = () => {
	const ShoppingList = {
		list: [],
		addToList: (item,price) => {
			ShoppingList.list.push({item, price});
			console.log(ShoppingList.list);
			ethansshoppinglist.displayList();
		},
		displayList: () => {
			let str = '';
			for (let i = 0; i < ShoppingList.list.length; i++) {
				str += "<li><span>" + (i+1) + '. ' + ShoppingList.list[i].item + '</span><span>$' + ShoppingList.list[i].price + "</span><a class='delete' href='#'>Delete</a><a class='edit' href='#'>Edit</a></li>";
			}
			shoppingListDiv.html("<ul>"+str+"</ul>");
			const justPrices = ShoppingList.addPrices(ShoppingList.list);
			const totalPrice = justPrices.reduce((accumulator,currentValue) => {
				return accumulator + parseFloat(currentValue);
			},0);
			totalPriceDiv.removeClass('hidden');
			totalPriceDiv.children('span').html('$' + totalPrice.toFixed(2));
			console.log(totalPrice);
		},
		deleteItemInList: (index) => {
			ShoppingList.list.splice(index, 1);
			ShoppingList.displayList();
			if (ShoppingList.list.length < 1) {
				shoppingListDiv.html("Empty List");
				totalPriceDiv.addClass('hidden');
			}
			return ShoppingList.list;
		},
		editItemInList: (index,item,price) => {
			ShoppingList.list[index] = {item,price};
			ShoppingList.displayList();
			return ShoppingList.list;
		},
		addPrices: (array) => {
			return array.map((el) => {
				return el.price;
			})
		}
	};

	return ShoppingList;
}

//hitting enter to add item from top input fields
priceInput.on('keydown', function(e){
	if (e.keyCode === 13) {
		addItemClick(e);
	}
})

itemInput.on('keydown', function(e){
	if (e.keyCode === 13) {
		addItemClick(e);
	}
})

//hitting button to add item
$('.add-item').on('click', function(e){
	addItemClick(e);
})


//add item helper function
function addItemClick (e) {
	if (itemInput.val().length > 2 && priceInput.val().length > 3) {
		ethansshoppinglist.addToList(itemInput.val(),priceInput.val());
		itemInput.add(priceInput).val('');
		//console.log(ethansshoppinglist.displayList())
		$('.error').remove();
		itemInput.focus();
		e.preventDefault();
	} else {
		shoppingListDiv.before('<div class="error">Item must be at least 3 letters long and price must have dollar and cents</div>')
	}
}

//hitting delete button
$('body').on('click','a.delete', function(e){
	e.preventDefault();
	ethansshoppinglist.deleteItemInList($(this).parent().index())
})

//hitting edit button
$('body').on('click','a.edit', function(e){
	let thisButton = $(this);
	let itemIndex = thisButton.parent().index();

	//entering items you have edited
	if (thisButton.hasClass('editing')) {
		ethansshoppinglist.editItemInList(itemIndex, thisButton.next().val(), thisButton.next().next().val());
		itemInput.focus();
		//thisButton.next().remove();
	} else {
	//submitting edited items
		thisButton.after('<input type="text" class="edit-item-input" value="'+ ethansshoppinglist.list[itemIndex].item +'"/><input type="text" class="edit-price-input" value="'+ ethansshoppinglist.list[itemIndex].price +'"/>')
		thisButton.addClass('editing');
		$('.edit-item-input').focus();
	}
	e.preventDefault();
})

//hitting enter when finished editing item
$('body').on('keydown', '.edit-item-input', function(e){
	if (e.keyCode === 13) {
		ethansshoppinglist.editItemInList($(this).parent().index(), $(this).val(),thisButton.next().val());
	}
})

$('body').on('keydown', '.edit-price-input', function(e){
	if (e.keyCode === 13) {
		ethansshoppinglist.editItemInList($(this).parent().index(), $(this).prev().val(),$(this).val());
	}
})

const ethansshoppinglist = getShoppingList();
