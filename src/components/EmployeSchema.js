
export const addressSchema = {
  name: "Address",
  properties: {
    street: "string",
    suite: "string",
    city: "string",
    zipcode: "string"
  }
}

export const comapnySchema = {
  name: "Company",
  properties: {
    name: "string",
    catchPhrase: "string",
    bs: "string"
  }
}

export const EmployeSchema = {
  name: "Employe",
  properties: {
    id: "int",
    name: "string",
    username: "string",
    email: "string",
    profile_image: "string",
    address: 'Address',
    phone: "string",
    website: "string",
    company: 'Company'
  },
};


