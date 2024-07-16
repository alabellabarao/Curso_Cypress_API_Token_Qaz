/// <reference types="cypress"/>

describe('Update Booking', () => {

    let token = null
    let bookingid = null

    before('Login', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                "username" : "admin",
                "password" : "password123"
            }
        })
            .then ((response) => {
                expect(response.status).equal(200)
                expect(response.body).to.have.property('token')
                token = response.body.token
            })

    })

    beforeEach('Create Booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking/',
            body: {     
                "firstname": "Nome do Cristofer Fernando",     
                "lastname": " da Silva Silveira",     
                "totalprice": 9868,     	
                "depositpaid": true,     
                "bookingdates": {         
                       "checkin": "2023-02-03",         
                       "checkout": "2023-02-08"     
                       },     
                "additionalneeds": "New Breakfast - NOVO" 
            }
                
        }).then((response)=> {
            console.log('Reserva criada ', + response.body.bookingid)
            expect(response.status).equal(200)
            expect(response.body.bookingid).not.to.null
            expect(response.body.bookingid).to.be.a('number')
            expect(response.body.booking.totalprice).equal(9868)
            expect(response.body.booking.depositpaid).equal(true)
            bookingid = response.body.bookingid
        
        })
    })

    it('Update Booking', () => {
        cy.request({
            method: 'PUT',
            url: 'https://restful-booker.herokuapp.com/booking/' + bookingid,
            //url: `https://restful-booker.herokuapp.com/booking/${ bookingid}`,
            body: {     
                "firstname": "Ferdinando do Cristofer Fernando",     
                "lastname": " da Silva Silveira Silva",     
                "totalprice": 5000,     	
                "depositpaid": false,     
                "bookingdates": {         
                       "checkin": "2023-05-03",         
                       "checkout": "2023-05-08"     
                       },     
                "additionalneeds": "New Breakfast - NOVO café da manhä" 
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=' + token
                //'Cookie': `token= ${token}`
            }
            
        }).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.totalprice).equal(5000)
            expect(response.body.lastname).equal('da Silva Silveira Silva')
            expect(response.body.firstname).equal('Ferdinando do Cristofer Fernando')
            expect(response.body.depositpaid).equal(false)
            expect(response.body.bookingdates.checkin).equal('2023-05-03')
            expect(response.body.bookingdates.checkout).equal('2023-05-08')
            expect(response.body.additionalneeds).equal('New Breakfast - NOVO café da manhä')


        })
    })
    it('Update Booking without token invalid', () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${ bookingid}`,
            failOnStatusCode: false,
            body: {     
                "firstname": "Nome do Cristofer Fernando",     
                "lastname": " da Silva Silveira",     
                "totalprice": 988,     	
                "depositpaid": true,     
                "bookingdates": {         
                       "checkin": "2023-02-03",         
                       "checkout": "2023-02-08"     
                       },     
                "additionalneeds": "New Breakfast - NOVO" 
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            
        })
    })

    it('Update Booking without token', () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${ bookingid}`,
            failOnStatusCode: false,
            body: {     
                "firstname": "Nome do Cristofer Fernando",     
                "lastname": " da Silva Silveira",     
                "totalprice": 988,     	
                "depositpaid": true,     
                "bookingdates": {         
                       "checkin": "2023-02-03",         
                       "checkout": "2023-02-08"     
                       },     
                "additionalneeds": "New Breakfast - NOVO" 
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=123445' 
            }
            
        })
    })
})