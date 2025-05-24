// Added host: "127.0.0.1" to vite.config.js to enforce IPv4 binding
// since Cypress sometimes has issues working correctly with the IPv6 address [::1]

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'secret',
    };

    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:5173');
  });

  //5.17: blogilistan end to end ‑testit, step1
  it('Login form is shown', function () {
    cy.contains('Login');
  });

  //5.18: blogilistan end to end ‑testit, step2
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click();
      cy.get('#username').type('hellas');
      cy.get('#password').type('secret');
      cy.get('#login-button').click();

      cy.contains('Arto Hellas logged in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('Login').click();
      cy.get('#username').type('hellas');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.notification-msg-error').should(
        'contain',
        'Wrong username or password'
      );
      cy.get('html').should('not.contain', 'Arto Hellas logged in');
    });
  });

  //5.19: blogilistan end to end ‑testit, step3
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('hellas');
      cy.get('#password').type('secret');
      cy.get('#login-button').click();
    });
    //can create a blog
    it('A blog can be created', function () {
      cy.contains('create new blog').click();

      cy.get('#title').type('Node JS course');
      cy.get('#author').type('John Smilga');
      cy.get('#url').type('https://johnsmilga.com');
      cy.get('#create-blog-btn').click();

      cy.contains('Node JS course');
      cy.contains('John Smilga');
    });

    //5.20: blogilistan end to end ‑testit, step4
    //can like a blog
    it('User can like a blog', function () {
      cy.contains('create new blog').click();

      cy.get('#title').type('Node JS course');
      cy.get('#author').type('John Smilga');
      cy.get('#url').type('https://johnsmilga.com');
      cy.get('#create-blog-btn').click();

      cy.contains('Node JS course');
      cy.contains('John Smilga');
      cy.get('#view-btn').click();

      cy.contains('Likes 0');
      cy.get('#like-btn').click();
      cy.contains('Likes 1');
    });

    //5.21: blogilistan end to end ‑testit, step5
    // A blog can be deleted by the user who created it
    it('A blog can be deleted by the user who created it', function () {
      cy.contains('create new blog').click();

      cy.get('#title').type('Node JS course');
      cy.get('#author').type('John Smilga');
      cy.get('#url').type('https://johnsmilga.com');
      cy.get('#create-blog-btn').click();

      cy.contains('Node JS course');
      cy.contains('John Smilga');
      cy.get('#view-btn').click();

      cy.get('#remove-btn').click();
      cy.on('window:confirm', () => true);

      cy.contains('.blog', 'Node JS course').should('not.exist');
    });

    //5.22: blogilistan end to end ‑testit, step6
    // The user who created the blog can also see the "remove" button
    it('The user who created the blog can also see the "remove" button', function () {
      cy.contains('create new blog').click();

      cy.get('#title').type('Node JS course');
      cy.get('#author').type('John Smilga');
      cy.get('#url').type('https://johnsmilga.com');
      cy.get('#create-blog-btn').click();
      cy.get('#view-btn').click();
      cy.contains('User: Arto Hellas');
      cy.contains('remove');

      cy.get('#logout-btn').click();

      const testUser = {
        name: 'Test User',
        username: 'testuser',
        password: 'secret',
      };

      cy.request('POST', 'http://localhost:3003/api/users', testUser);

      cy.get('#username').type('testuser');
      cy.get('#password').type('secret');
      cy.get('#login-button').click();

      cy.get('#view-btn').click();

      cy.contains('Node JS course').parent().should('not.contain', 'remove');
    });
  });
});
