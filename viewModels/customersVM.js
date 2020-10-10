module.exports = function(customer, person) {
  var customerVm = {
    person_name_1: person.person_name_1,
    person_name_2: person.person_name_2,
    person_lastname_1: person.person_lastname_1,
    person_lastname_2: person.person_lastname_2,
    person_phone: person.person_phone,
    person_gender: person.person_gender,
    person_bday: person.person_bday,
    status: person.status,
    person_id: customer.person_id,
    nit: customer.nit,
    customer_phone: customer.customer_phone,
    customer_cellphone: customer.customer_cellphone,
    customer_status: customer.status
  };
  return customerVm;
};
