# Description

Shape Sorter helps the developer who needs to create a micro frontend infrastructure, providing, through templates, the initial project along with a configuration file. This configuration file is where all the settings referring to the micro frontend will be added and manipulated. The command line tool allows the developer to:

- Create a project able to integrate, in the case of a host, or be integrated, in the case of a module, in a micro frontend, along with a project in React.js;
- Add new remote modules to the host;
- Expose specific components of a module;
- Add new dependencies to be shared.

In this version of the proposed tool, the template created is from a project in React.js. This choice was made because it is a popular tool among the community, easy to use, and in the case of Shape Sorter, it allows module components to be easily integrated into the host.

# Functionalities

To assess the feasibility of the tool, a project similar to the one demonstrated by Michael Geers in [2] was created. A tractor model shop's product page will serve as the basis for the following examples.

![image](https://user-images.githubusercontent.com/8145430/118288195-8c868c00-b4aa-11eb-974b-3fd681edb899.png)
Image 2.1


# Startup


Tool installation using the command:

`$ npm install -g shape-sorter

This command allows you to install Shape Sorter and use the CLI in any project globally.

After installing the tool, a project folder is created, with subfolders equivalent to each micro frontend of the developer. In the case of the example, the Models folder was created, referring to the project as a whole, and as child folders the projects related to the product, checkout and inspire teams, which are suggested in the example referring to the image above.

![image](https://user-images.githubusercontent.com/8145430/118288544-ec7d3280-b4aa-11eb-9a9d-8c171ccb4efb.png)

After that, templates are created in each project.

# Create command

The creation of the product page project, which is a host (page that includes all the others), is done through the command:

`$ shape-sorter create`

This command shows some questions for creating the project, which are:
What is the name of the project?
What kind of micro frontend? (Host or module)
Which port would you like to run the
project?

![image](https://user-images.githubusercontent.com/8145430/118288632-fa32b800-b4aa-11eb-9f7a-f9495eb3c79d.png)


When the command is executed and the questions answered, a project is created in React.js with the file .shapesorterrc.json containing all the variables to be used by the micro frontends.

![image](https://user-images.githubusercontent.com/8145430/118288665-01f25c80-b4ab-11eb-9f00-9b4e42acf590.png)


To start the project and view it in the browser, just enter the commands:

`$ npm install // or yarn`

`$ npm run start // or yarn start`

After that, the project will already be running in the browser, and can be accessed as localhost address and the port inserted in the creation.

After inserting the files, in order to be like the example, the products project will present itself as follows:

![image](https://user-images.githubusercontent.com/8145430/118288703-09196a80-b4ab-11eb-977a-c9438cd59312.png)


For the creation of checkout and inspire projects, which are modules inserted in products, the same creation command mentioned above is followed. After inserting the module name in the question asked at creation, both projects will be selected as Module, and executed respectively on ports 3001 and 3002 in the case of the example.

# Exposition of components of a module
The checkout module will expose two components: the Basket, which indicates the number of items in the cart, and CheckoutButton, which is the button to checkout.

![image](https://user-images.githubusercontent.com/8145430/118288762-13d3ff80-b4ab-11eb-8e96-e8b296b3253d.png)

Above the two components related to the checkout project, Basket and CheckoutButton

To expose the Basket and CheckButton components to the product page, the following command is entered:

`$ shape-sorter expose`

This command will ask the developer:
What name will expose this component with?
What path is this component located?

![image](https://user-images.githubusercontent.com/8145430/118288913-32d29180-b4ab-11eb-8802-c8a2f6a152d5.png)

The example above is related to the Basket component. After that the same is done for the CheckoutButton component. At the end both components will be able to be used by host products.

As with the checkout project, the same is done with the inspire project; the RelatedProducts component is exposed, following the same expose command mentioned above.

![image](https://user-images.githubusercontent.com/8145430/118289409-b3918d80-b4ab-11eb-8d18-cacf80e671b8.png)

Above image of RelatedProducts component in checkout project

# Importing a module
In order for all micro frontends to be integrated into the final project, the components exposed above are attached as remote modules in the host products through the following command:

`$ shape-sorter remote`

![image](https://user-images.githubusercontent.com/8145430/118289454-bd1af580-b4ab-11eb-8682-2984f0081d30.png)

This command asks some questions like:
What is the name of the module whose component is being exported?
What name would you like to use the module with (optional)
What is the name of the component being imported?
What address is the module running on?

After this command, the address of the attached component is integrated into the list of remote host modules, making it possible to use it at runtime. This command also creates a file referring to the imported component, making it possible to use it asynchronously.

![image](https://user-images.githubusercontent.com/8145430/118289475-c4da9a00-b4ab-11eb-8192-5dd17f0fafdc.png)


Just as the Basket component, from the checkout project, was imported, the same is done with the CheckoutButton, also from the checkout project, and in addition, the RelatedProducts component from the inspire project is imported.

As the files created in the remotes folder already allow its use, the components are added to the products host page, making the final page resemble the one shown initially, symbolized in the first image.

![image](https://user-images.githubusercontent.com/8145430/118289532-d459e300-b4ab-11eb-99ec-bf51af9fd2b4.png)


# Insertion of dependencies

In order to demonstrate the sharing of dependencies between micro frontends, a library was added, in projects and in checkout, called date-fns to assist in handling dates. In projects, at the bottom of the left-hand page it says which day of the week it is today, and in checkout, indicated in the Basket component, the date three days ago formatted.

![image](https://user-images.githubusercontent.com/8145430/118289583-e176d200-b4ab-11eb-880a-e36bb8b74c37.png)


To share the library between projects, so that there is no code redundancy or divergence between versions, the developer can insert which dependencies he would like to share between projects with the following command:

`$ shape-sorter dependency`

![image](https://user-images.githubusercontent.com/8145430/118289610-e9cf0d00-b4ab-11eb-96fa-bf1e38f9a196.png)


The command lists all dependencies that have not yet been shared and the developer is able to choose the ones he wants to share.


The command displays a list of dependencies, and the developer can select the ones they want to add. After selection, the following questions are asked for each selected dependency:
`Is the dependency a singleton? (a single version)`

`Is the dependency eager? (is loaded at initialization)`
