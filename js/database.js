
class Person {
    static lastID = localStorage.getItem("lastIDPerson") ? +(localStorage.getItem("lastIDPerson")) : 0;
    #id; #name; #email; #password; #address; #phone; #role;
    constructor(id, _name, _email, _password, _address, _phone, _role) {
        // debugger;
        // this.#id = ++(Person.lastID);
        this.id = id;
        localStorage.setItem("lastIDPerson", Person.lastID);
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.address = _address;
        this.phone = _phone;
        this.role = _role;
    }
    set id(_id) {
        this.#id = _id;
    }
    set name(_name) {
        if (_name.trim() == "") {
            this.#name = "No name";
        }
        else {
            this.#name = _name.trim();
        }
    }
    set email(_email) {
        if (_email.trim() == "") {
            this.#email = "No email";
        }
        else {
            this.#email = _email.trim();
        }
    }
    set password(_password) {
        if (_password == "") {
            this.#password = "No Password";
        } else {
            this.#password = _password;
        }
    }
    set address(address) {
        if (address.trim() == "") {
            this.#address = "No address";
        }
        else {
            this.#address = address.trim();
        }
    }
    set phone(phone) {
        if (phone.trim() == "") {
            this.#phone = "No phone";
        }
        else {
            this.#phone = phone.trim();
        }
    }
    set role(_role) {
        const validRoles = ["Admin", "Customer", "Seller", "Guest"];
        if (!validRoles.includes(_role.trim())) {
            this.#role = "Guest";
        }
        else {
            this.#role = _role;
        }
    }
    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get email() {
        return this.#email;
    }
    get password() {
        return this.#password;
    }
    get address() {
        return this.#address;
    }
    get phone() {
        return this.#phone;
    }
    get role() {
        return this.#role;
    }
    getPerson() {
        return {
            id: this.#id,
            name: this.#name,
            email: this.#email,
            password: this.#password,
            address: this.#address,
            phone: this.#phone,
            role: this.#role
        }
    }
    setPerson(name, email, password, address, phone, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.role = role;
    }
}

class Product{
    static lastID = localStorage.getItem("lastIDProduct") ? +(localStorage.getItem("lastIDProduct")) : 0;
    #id; #name; #price; #quantity; #description; #image; #sellerID; #category; #categorypath; #otherCategory;
    constructor(id,name, price, quantity, description, image, sellerID, category, categorypath = 'Home / Home Office / Black Metal Lamp', otherCategory = category){
        // debugger;
        this.id = id;
        localStorage.setItem("lastIDProduct", Product.lastID);
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.image = "../" + image;
        this.sellerID = sellerID;
        this.category = category;
        this.categorypath = categorypath;
        this.otherCategory = otherCategory;
    }
    set id(_id){
        this.#id = _id;
    }
    set quantity(_quantity){
        if(_quantity < 0){
            this.#quantity = 0;
        }
        else{
            this.#quantity = +_quantity;
        }
    }
    set price(_price){
        if(_price < 0){
            this.#price = 0;
        }
        else{
            this.#price = _price;
        }
    }
    set name(_name){
        if(_name == ""){
            this.#name = "No name";
        }
        else{
            this.#name = _name.trim();
        }
    }
    set description(_description){
        if(_description.trim() == ""){
            this.#description = "No description";
        }
        else{
            this.#description = _description.trim();
        }
    }
    set image(_image){
        if(_image.trim() == ""){
            this.#image = "No image";
        }
        else{
            this.#image = _image.trim();
        }
    }
    set sellerID(_sellerID){
        if(_sellerID < 0){
            this.#sellerID = 0;
        }
        else{
            this.#sellerID = +_sellerID;
        }
    }
    set category(_category){
        const validRooms = ['Bathroom', 'Bedroom', 'Home Office', 'Kitchen', 'Living Room', 'Cabinet', 'Home-accessories'];
        if(validRooms.includes(_category)){
            this.#category = _category;
        }
        else{
            this.#category = 'Other';
        }
    }
    set categorypath(_categorypath){
        this.#categorypath = _categorypath;
    }
    set otherCategory(_otherCategory){
        this.#otherCategory = _otherCategory;
    }
    get category(){
        return this.#category;
    }
    get id(){
        return this.#id;
    }
    get quantity(){
        return this.#quantity;
    }
    get price(){
        return this.#price;
    }
    get name(){
        return this.#name;
    }
    get description(){
        return this.#description;
    }
    get image(){
        return this.#image;
    }
    get sellerID(){
        return this.#sellerID;
    }
    getProduct(){
        return {
            id: this.#id,
            name: this.#name,
            price: this.#price,
            quantity: this.#quantity,
            description: this.#description,
            image: this.#image,
            sellerID: this.#sellerID,
            category: this.#category,
            categoryPath: this.#categorypath,
            otherCategory: this.#otherCategory,
        }
    }
    setProduct(name, price, quantity, description, image, sellerID, category){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.image = image;
        this.sellerID = sellerID;
        this.category = category;
    }
}





var persons = [
    new Person(1, "Ali Hassan", "ali.hassan1234@gmail.com", "Password@01", "Cairo-Street-1", "01012345678", "Admin"),
    new Person(2, "Mona Samir", "mona.samir5678@yahoo.com", "Password@02", "Giza-24th-St", "01234567890", "Admin"),
    new Person(3, "Khaled Ahmed", "khaled.ahmed9@gmail.com", "Password@03", "Alexandria-Downtown", "01098765432", "Seller"),
    new Person(4, "Muhammad Nasr", "muhammadnasr@gmail.com", "Temp@123", "Sharm-ElSheikh-RedSea", "01122334455", "Seller"),
    new Person(5, "Sayed Fathy", "sayed.fathy32@gmail.com", "Password@08", "Cairo-CityCenter", "01065432123", "Seller"),
    new Person(6, "Nour El-Din", "nour.din4567@gmail.com", "Password@05", "Mansoura-10th-St", "01087654321", "Customer"),
    new Person(7, "Sarah Khaled", "sarah.khaled88@gmail.com", "Password@07", "PortSaid-City", "01122334466", "Customer"),
    new Person(8, "Mohamed Omar", "mohamed.omar1990@gmail.com", "Password@06", "Cairo-ElMaadi", "01022334477", "Customer"),
    new Person(9, "Laila Farouk", "laila.farouk77@gmail.com", "Password@09", "Alexandria-Corniche", "01133445588", "Customer"),
    new Person(10, "Hossam Ghanem", "hossam.ghanem5555@gmail.com", "Password@10", "Fayoum-Street-2", "01044556699", "Customer")
];

var products = [
    new Product(1,'Anthea Bed', 299, 9, `We love Anthea for its abstract form and gentle statement. With its modern and classic shape, the metal design will work well in any bedroom style. This is one beautiful bed with soul, who doesn't love that for bedtime.
DOUBLE Height 135cm x Width 142cm x Depth 198cm
KING Height 135cm x Width 157cm x Depth 208cm
Wipe clean only. `
, 'images/bed2.jpg', persons[4].id, 'Bedroom', 'Home / bedroom-furniture', 'Bed, bedroom'),


    new Product(2,'Tacoma Bed',1000,16,`Tacoma's an example of expert craftsmanship. Just look at the joint detailing and subtly curved shape. This oak bed is the key to realising your Scandi styling dreams. Height 92(cm), Width 154(cm), Depth 225(cm), Weight 53(kg).
DOUBLE Height 92cm x Width 154cm x Depth 225cm
KING Height 92cm x Width 169cm x Depth 235cm`
    , 'images/bed1.jpg', persons[2].id,'Bedroom','Home / bedroom-furniture','Bed, bedroom'),

    new Product(3,'Penn Metal Bed Frame',450,10,`Penn's been designed down to the last detail. Made from coloured powder-coated metal, for an on-trend finish that'll suit industrial and contemporary sleeping spaces. Who thought sleeping could look so chic?
DOUBLE Height 102cm x Width 145.5cm x Depth 209.5cm
KING Height 102cm x Width 160.5cm x Depth 219.5cm
SUPER KING Height 102cm x Width 219.5cm x Depth 190.5cm`
    , 'images/bed3.jpg', persons[3].id,'Bedroom','Home / bedroom-furniture','Bed, bedroom'),

    new Product(4,'Jasper Conran London Belgrave Walnut Stool',199,20,`Part of the elegant Belgrave range, this walnut stool is a stylish addition to the Belgrave dressing table. Made from solid walnut with a padded cushion in off white, this striking design is a refined addition to your home. Solid walnut. Padded cushion in off white fabric. Assembled.
Height 45cm
Width 42cm
Depth 36cm`
    ,'images/bedChair1.jpg', persons[4].id,'Bedroom','Home / bedroom-furniture / Chair','Chair, bedroom'),

    new Product(5,'Odie Bedside Table',299,17,`The Odie range is sleek and modern, but it's got a timeless story behind it. The range takes its inspiration from vintage sewing boxes. There's a clever hidden drawer in this bedside table, so you can keep your nighttime necessities at hand without having them all on view. Height (cm: )50 Width (cm): 40 Depth (cm): 40.
Height 50cm
Width 41cm
Depth 41cm
Wipe clean only.`
    ,'images/bedTable1.jpg', persons[2].id,'Bedroom','Home / bedroom-furniture / Table','Table, bedroom'),

    new Product(6,'OYOY Living Jali Large Vase',128,25,`TFall in love with Jali! The glass series Jali is made with cute colourful details in a simple design with rounded edges, making it a chubby and powerful glass. Jali Hurriane can be used as both a lantern, a vase or for decoration, making it a super versatile piece in your collection. The Jali series is handmade, making every single piece unique, and they will vary in size, shape and design. Ø21,5 x H35 cm.
Height 35cm
Width 21.5cm
Depth 21.5cm
Wipe clean only.
100% Glass`
    ,'images/vase1.jpg', persons[3].id,'Home-accessories','Home / Home-accessories / Vase','Vase, Home-accessories'),



    new Product(7,'OYOY Living Jali Tall Vase',58,25,`Height 23cm
Width 14cm
Depth 14cm
Wipe clean only.
100% Glass.`
    ,'images/vase2.jpg', persons[4].id,'Home-accessories','Home / Home-accessories / Vase','Vase, Home-accessories'),

    new Product(8,'Wingrove Wide TV Shelving Unit',999,10,`Wingrove's retro-inspired shelving unit features standout French oak legs, combining style with functionality. Designed by award-winning Andy Boyce, it offers space for tech, books, and more, blending form and function seamlessly. Self-assembly required.
Height: 180cm
Width: 175cm
Depth: 44cm`
    ,'images/shelv1.jpg', persons[2].id,'Living Room','Home / living-room-furniture / TV Shelving Unit','TV Shelving Unit, living-room-furniture'),
    new Product(9,'Hopkins Narrow Bookcase',299,15,`Does clutter do nothing for you? We get it. Thats why Hopkins is an essential. Clean lines, sleek design and plenty of storage. Our MADE Studio came up with this one so no wonder this narrow bookcase looks so good.
Height 173cm
Width 80cm
Depth 32cm
Wipe clean only.`
    ,'images/shelv2.jpg', persons[3].id,'Living Room','Home / living-room-furniture / Bookcase','Bookcase, living-room-furniture'),

    new Product(10,'Umbra Bellwood Bar & Serving Cart',200,35,`The Bellwood Bar Cart is a stylish two-tier wooden cart with rubber-rimmed wheels for mobility, ideal for bars, gardens, or storage.
Dimensions: L 53 x W 44 x H 80 cm.
Care: Wipe clean only.`
    ,'images/servingCart1.jpg', persons[2].id,'Living Room','Home / living-room-furniture / Table','Table, living-room-furniture'),

        
    new Product(11,'Odie Console Dressing Table',699,15,`The Odie range is sleek and modern, but it's got a timeless story behind it. The range takes its inspiration from vintage sewing boxes. Nifty little side drawers are what makes this dressing table so smart. They swivel out, too, so rummaging for your favourite lipstick is a thing of the past.
Height 123cm
Width 105cm
Depth 42.5cm
Wipe clean only.`
    ,'images/dressTable1.jpg', persons[4].id,'Bedroom','Home / bedroom-furniture / Table','Table, bedroom'),

    new Product(12,'Zayla Fixed Dining Table',249,20,`Height 75cm
Width 100cm
Depth 100cm`
    ,'images/diningTable2.jpg', persons[2].id,'Kitchen','Home / Dining Room Furniture / Table','Table, Dining-Room-Furniture'),
    new Product(13,'Quinn Dining Table',999,25,`Relaxed and modern, yet homely, Quinn appeals to our modern Farmhouse dreams. Designed in lovely oak and oak veneer, this piece pairs perfectly with the Quinn bench.
Height 76cm
Width 190cm
Depth 90cm`
    ,'images/diningTable1.jpg', persons[3].id,'Kitchen','Home / Dining Room Furniture / Table','Table, Dining-Room-Furniture'),

    new Product(14,'Dunston Coffee Nest',399,20,`Dunston knows that it pays to make a good impression. From its rounded metal frame to the multi-dimensional finish and glass tops, consider your coffee table search complete.
Height 50cm
Width 105cm
Depth 30cm`
    ,'images/coffeTable1.jpg', persons[4].id,'Living Room','Home / living-room-furniture / Coffee Tables','Coffee Tables, living-room-furniture'),

    new Product(15,'Fergal Round Coffee Table',379,18,`Painted green top, funky wood detail, round shape, add something exciting to your lounge.
Height 25cm
Width 107.5cm
Depth 107.5cm`
    ,'images/diningTable2.jpg', persons[2].id,'Living Room','Home / living-room-furniture / Coffee Tables','Coffee Tables, living-room-furniture'),

    new Product(16,'Luca Cane Side Table',149,5,`The Luca side table is the perfect balance of worldly and home. Designed in a quirky shape with a cane base and painted ecru white finish. It will slot next to a sofa as happily as beside a bed.
Height 50cm
Width 38cm
Depth 38cm`
    ,'images/sideTable1.jpg', persons[3].id,'Living Room','Home / living-room-furniture / side-table','side-table,living-room-furniture'),

    new Product(17,'Bobo Accent Chair',550,25,`Designer collaboration- designed by Omayra Maymo - a Spanish artist who sees herself as a story teller, skilled in both architecture & design. The Bobo is made from a Cotton & Linen blend fabric with a sculptural and statement shape. Inspired by a modern studio design style, it's complete with chunky upholstered arm detail and a low / wide profile.
Height 69cm
Width 95cm
Depth 87cm`
    ,'images/armChair2.jpg', persons[4].id,'Living Room','Home / Sofas ','Sofas,Home'),

    new Product(18,'Jarrod Leather Accent Chair',1099,27,`Design up top and sleek lines below? That's Jarrod. It's the modern way to add an industrial vibe to your home. Slim metal frame, smooth leather, and oversized cushions on a sofa this sophisticated, you won't want to be anywhere else. Filling type: Fibre, Foam. Height (cm): 74. Width (cm): 80. Depth (cm): 91. Leg height (cm): 21. Arm Dimensions (cm): 41 x 11 x 86.
Height 74cm
Width 80cm
Depth 91cm
Wipe clean only.`
    ,'images/armChair1.jpg', persons[2].id,'Living Room','Home / Sofas ','Sofas,Home'),

    new Product(19,'Brayla Sofa in a Box',799,17,`Stylish and compact, our Brayla sofa is designed with smaller spaces in mind. This sofa in a box style is a simple yet statement piece for your living space, with roll seat cushions and plush arm cushions to promote lounging and relaxing. Finished with solid wood legs for a sturdy placement and flange detailing on the frame to highlight the soft shape.
Height 80cm
Width 188cm
Depth 91cm
Wipe clean only.`
    ,'images/sofa3.jpg', persons[3].id,'Living Room','Home / Sofas ','Sofas,Home'),

    new Product(20,'Jarrod 3 Seater Sofa',1599,37,`Design up top and sleek lines below? That's Jarrod. It's the modern way to add an industrial vibe to your home. Slim metal frame, smooth leather, and oversized cushions on a sofa this sophisticated, you won't want to be anywhere else. Filling Type: Fibre, Foam. Foam type: Polyethylene. Features: High back, Wooden Frame.
Height 72cm
Width 215cm
Depth 91cm
Wipe clean only.`
    ,'images/sofa2.jpg', persons[3].id,'Living Room','Home / Sofas ','Sofas,Home'),

    new Product(21,'Knox 2 Seater Sofa Bed',425,14,`The Knox 2-Seater Sofa Bed combines minimalist design with functionality. Its angled metal legs add a modern retro style. Comfortable and firm, it transforms easily into a bed for guests.
Key Features: Redwood frame, 35D foam filling, fully assembled, supports up to 280kg.
Dimensions: Sofa (H85 x W190 x D80.5cm), Bed (H38 x W190 x D110cm).
Leg Height: 23.5cm.
Weight: 40kg.
Ideal for small spaces.`
    ,'images/sofa1.jpg', persons[4].id,'Living Room','Home / Sofas ','Sofas,Home'),

    new Product(22,'OYOY Living Maru Wall Rug',87,40,`THeight 103cm
Width 60cm
Depth 60cm
Do not wash.
80% Wool, 20% Cotton.`
    ,'images/wall1.jpg', persons[2].id,'Home-accessories','Home / Accessories / Wallart ','Wallart,Accessories'),

    new Product(23,'Paper Collective Lemons Framed Wall Art Print in Natural Oak Frame',110,38,`Add a pop of color with the Lemons Art Print by Stockholm artist Liat Greenberg. Featuring vibrant citrus against an orange backdrop, its mix of watercolors and pastels adds depth and softness.
H42 x W32 x D2cm
Made in Denmark with eco-certified materials.
Composition: 50% paper, 25% wood, 25% glass.
Wipe clean only.`
    ,'images/wall2.jpg', persons[3].id,'Home-accessories','Home / Accessories / Wallart ','Wallart,Accessories'),

    new Product(24,'Paper Collective Tapas Dinner Framed Wall Art Print in Natural Oak Frame',70,32,`Celebrate vibrant gatherings with Tapas Dinner Framed Wall Art by Tel Aviv artist Adee Ardon. Depicting a lively spread of fruit and seafood, the piece uses oil pastels and sticks to capture movement and atmosphere, evoking cherished moments with loved ones.
H72 x W52 x D2cm
Made in Denmark with eco-certified materials.
Composition: 50% paper, 25% wood, 25% glass.
Wipe clean only.`
    ,'images/wall3.jpg', persons[4].id,'Home-accessories','Home / Accessories / Wallart ','Wallart,Accessories'),

    new Product(25,'Paper Collective Primary Spaces Framed Wall Art Print in Dark Oak Frame',70,19,`Minh Ts photographic series uses architecture and human figures as characters in a visual narrative, creating a sense of escapism. Known for simplicity and elegance, his work tells a story through minimalistic photography.
H42 x W32 x D2cm
Made in Denmark from eco-certified materials.
Composition: 50% paper, 25% wood, 25% glass.
Wipe clean only.`
    ,'images/wall4.jpg', persons[2].id,'Home-accessories','Home / Accessories / Wallart ','Wallart,Accessories'),

    new Product(26,'Ankhara Wardrobe',1199,10,`Cosy, Nordic opulence? Ankhara's into it. A refined combination of oak and rattan, this double wardrobe's curved silhouette feels warm and welcoming – and it'll hang your outfits nicely.
Height 188cm
Width 88cm
Depth 59cm
Wipe clean only.`
            ,'images/wardrobe1.jpg', persons[3].id,'Bedroom','Home / bedroom-furniture / wardrobes','Wardrobes,bedroom-furniture '),

    new Product(27,'Jasper Conran London Belgrave Walnut Wardrobe',1299,10,`The elegant Belgrave walnut wardrobe by Jasper Conran London is crafted using solid and veneered walnut. The vertical panels and elevated silhouette give this piece a minimalistic flourish. Designed with soft close doors and drawers with an internal storage drawer, shelf and rail., making this wardrobe is just as practical as it is stylish.
Height 200cm
Width 100cm
Depth 57cm`
            ,'images/wardrobe2.jpg', persons[4].id,'Bedroom','Home / bedroom-furniture / wardrobes','Wardrobes,bedroom-furniture ')
            


];

let orders = [
    {
        orderId: 1,
        _products_: [
            { id: products[2].id, name: products[2].name, quantity: 4 },
            { id: products[4].id, name: products[4].name, quantity: 3 },
            { id: products[10].id, name: products[10].name, quantity: 2 },
        ],
        Order_date: new Date('2024-12-02'),
        Delivered_date: new Date('2024-12-06'),
        status: 'pending',
        customerId: 6,
    },
    {
        orderId: 2,
        _products_: [
            { id: products[6].id, name: products[6].name, quantity: 5 },
            { id: products[8].id, name: products[8].name, quantity: 2 },
        ],
        Order_date: new Date('2024-11-29'),
        Delivered_date: new Date('2024-12-02'),
        status: 'delivered',
        customerId: 7,
    },
    {
        orderId: 3,
        _products_: [
            { id: products[0].id, name: products[0].name, quantity: 1 },
            { id: products[5].id, name: products[5].name, quantity: 4 },
            { id: products[12].id, name: products[12].name, quantity: 2 },
        ],
        Order_date: new Date('2024-12-01'),
        Delivered_date: new Date('2024-12-04'),
        status: 'pending',
        customerId: 8,
    },
    {
        orderId: 4,
        _products_: [
            { id: products[11].id, name: products[11].name, quantity: 3 },
            { id: products[13].id, name: products[13].name, quantity: 1 },
            { id: products[18].id, name: products[18].name, quantity: 5 },
        ],
        Order_date: new Date('2024-11-30'),
        Delivered_date: new Date('2024-12-05'),
        status: 'shipped',
        customerId: 9,
    },
    {
        orderId: 5,
        _products_: [
            { id: products[9].id, name: products[9].name, quantity: 2 },
            { id: products[17].id, name: products[17].name, quantity: 4 },
        ],
        Order_date: new Date('2024-12-03'),
        Delivered_date: new Date('2024-12-07'),
        status: 'pending',
        customerId: 10,
    },
    {
        orderId: 6,
        _products_: [
            { id: products[10].id, name: products[10].name, quantity: 3 },
            { id: products[16].id, name: products[16].name, quantity: 1 },
            { id: products[5].id, name: products[5].name, quantity: 2 },
        ],
        Order_date: new Date('2024-12-01'),
        Delivered_date: new Date('2024-12-04'),
        status: 'delivered',
        customerId: 6,
    },
    {
        orderId: 7,
        _products_: [
            { id: products[1].id, name: products[1].name, quantity: 4 },
            { id: products[7].id, name: products[7].name, quantity: 3 },
        ],
        Order_date: new Date('2024-12-04'),
        Delivered_date: new Date('2024-12-06'),
        status: 'shipped',
        customerId: 7,
    },
    {
        orderId: 8,
        _products_: [
            { id: products[3].id, name: products[3].name, quantity: 1 },
            { id: products[14].id, name: products[14].name, quantity: 2 },
            { id: products[9].id, name: products[9].name, quantity: 1 },
        ],
        Order_date: new Date('2024-12-01'),
        Delivered_date: new Date('2024-12-05'),
        status: 'pending',
        customerId: 8,
    },
    {
        orderId: 9,
        _products_: [
            { id: products[5].id, name: products[5].name, quantity: 3 },
            { id: products[16].id, name: products[16].name, quantity: 4 },
        ],
        Order_date: new Date('2024-12-02'),
        Delivered_date: new Date('2024-12-07'),
        status: 'pending',
        customerId: 9,
    },
    {
        orderId: 10,
        _products_: [
            { id: products[11].id, name: products[11].name, quantity: 1 },
            { id: products[3].id, name: products[3].name, quantity: 3 },
            { id: products[14].id, name: products[14].name, quantity: 2 },
        ],
        Order_date: new Date('2024-12-03'),
        Delivered_date: new Date('2024-12-06'),
        status: 'delivered',
        customerId: 10,
    },
    {
        orderId: 11,
        _products_: [
            { id: products[4].id, name: products[4].name, quantity: 2 },
            { id: products[7].id, name: products[7].name, quantity: 3 },
        ],
        Order_date: new Date('2024-12-02'),
        Delivered_date: new Date('2024-12-06'),
        status: 'shipped',
        customerId: 6,
    },
    {
        orderId: 12,
        _products_: [
            { id: products[8].id, name: products[8].name, quantity: 2 },
            { id: products[10].id, name: products[10].name, quantity: 1 },
        ],
        Order_date: new Date('2024-12-04'),
        Delivered_date: new Date('2024-12-07'),
        status: 'shipped',
        customerId: 7,
    },
    {
        orderId: 13,
        _products_: [
            { id: products[6].id, name: products[6].name, quantity: 3 },
            { id: products[12].id, name: products[12].name, quantity: 2 },
            { id: products[13].id, name: products[13].name, quantity: 1 },
        ],
        Order_date: new Date('2024-12-01'),
        Delivered_date: new Date('2024-12-05'),
        status: 'delivered',
        customerId: 8,
    },
    {
        orderId: 14,
        _products_: [
            { id: products[4].id, name: products[4].name, quantity: 2 },
            { id: products[17].id, name: products[17].name, quantity: 3 },
            { id: products[10].id, name: products[10].name, quantity: 1 },
        ],
        Order_date: new Date('2024-12-01'),
        Delivered_date: new Date('2024-12-04'),
        status: 'pending',
        customerId: 9,
    },
    {
        orderId: 15,
        _products_: [
            { id: products[5].id, name: products[5].name, quantity: 3 },
            { id: products[7].id, name: products[7].name, quantity: 2 },
            { id: products[12].id, name: products[12].name, quantity: 1 },
        ],
        Order_date: new Date('2024-12-04'),
        Delivered_date: new Date('2024-12-07'),
        status: 'pending',
        customerId: 10,
    },
];

//why both format

let originalOrders = [
    { id: 1, products: [2, 4, 10], quantities: [4, 3, 2], date: '02/12/2024', status: 'pending', customerId: 6 },
    { id: 2, products: [6, 8], quantities: [5, 2], date: '29/11/2024', status: 'delivered', customerId: 7 },
    { id: 3, products: [0, 5, 12], quantities: [1, 4, 2], date: '01/12/2024', status: 'pending', customerId: 8 },
    { id: 4, products: [11, 13, 18], quantities: [3, 1, 5], date: '30/11/2024', status: 'shipped', customerId: 9 },
    { id: 5, products: [9, 17], quantities: [2, 4], date: '03/12/2024', status: 'pending', customerId: 10 },
    { id: 6, products: [10, 16, 5], quantities: [3, 1, 2], date: '01/12/2024', status: 'delivered', customerId: 6 },
    { id: 7, products: [1, 7], quantities: [4, 3], date: '04/12/2024', status: 'shipped', customerId: 7 },
    { id: 8, products: [3, 14, 9], quantities: [1, 2, 1], date: '01/12/2024', status: 'pending', customerId: 8 },
    { id: 9, products: [5, 16], quantities: [3, 4], date: '02/12/2024', status: 'pending', customerId: 9 },
    { id: 10, products: [11, 3, 14], quantities: [1, 3, 2], date: '03/12/2024', status: 'delivered', customerId: 10 },
    { id: 11, products: [4, 7], quantities: [2, 3], date: '02/12/2024', status: 'shipped', customerId: 6 },
    { id: 12, products: [8, 10], quantities: [2, 1], date: '04/12/2024', status: 'shipped', customerId: 7 },
    { id: 13, products: [6, 12, 13], quantities: [3, 2, 1], date: '01/12/2024', status: 'delivered', customerId: 8 },
    { id: 14, products: [4, 17, 10], quantities: [2, 3, 1], date: '01/12/2024', status: 'pending', customerId: 9 },
    { id: 15, products: [5, 7, 12], quantities: [3, 2, 1], date: '04/12/2024', status: 'pending', customerId: 10 }
];

class Order {
    static lastID = 0;

    #id;
    #productId;
    #productName;
    #quantity;
    #date;
    #status;
    #customerName;

    constructor(productId, productName, quantity, date, status, customerName) {
        this.#id = ++Order.lastID;
        this.#productId = productId;
        this.#productName = productName;
        this.#quantity = quantity;
        this.#date = date;
        this.#status = status;
        this.#customerName = customerName;
    }

    set orderDate(_date) {
        if (_date instanceof Date && !isNaN(_date)) {
            this.#date = _date;
        } else {
            this.#date = new Date();
        }
    }

    set status(_status) {
        if (_status.trim() === "") {
            this.#status = "No status";
        } else {
            this.#status = _status.trim();
        }
    }

    set customerName(_customerName) {
        if (_customerName.trim() === "") {
            this.#customerName = "No customer name";
        } else {
            this.#customerName = _customerName.trim();
        }
    }

    get id() {
        return this.#id;
    }

    get productId() {
        return this.#productId;
    }

    get productName() {
        return this.#productName;
    }

    get quantity() {
        return this.#quantity;
    }

    get date() {
        return this.#date;
    }

    get status() {
        return this.#status;
    }

    get customerName() {
        return this.#customerName;
    }

    getOrder() {
        return {
            id: this.#id,
            productId: this.#productId,
            productName: this.#productName,
            quantity: this.#quantity,
            date: this.#date,
            status: this.#status,
            customerName: this.#customerName,
        };
    }
}


export {Order, products, persons,orders, originalOrders,  Person, Product};

