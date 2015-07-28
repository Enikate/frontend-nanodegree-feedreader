'use strict';

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         /* Test that loops through each feed
          * in the allFeeds object and ensures it has a URL defined
          * and that the URL is not empty.
          */
         it('has URLs defined', function() {
            expect(allFeeds instanceof Array).toBeTruthy();
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toMatch(/^http(s?)\:\/\//);
            });
         });


         /* Test that loops through each feed
          * in the allFeeds object and ensures it has a name defined
          * and that the name is not empty.
          */
         it('has names defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe('string');
                expect(feed.name).not.toBe('');
            });
         });
    });


    /* "The menu" */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('has menu hidden by default', function() {
            expect($('.menu-hidden').length).toBe(1);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('has menu changed on click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('.menu-hidden').length).toBe(0);
            $('.menu-icon-link').trigger('click');
            expect($('.menu-hidden').length).toBe(1);
        });
    });

    /* "Initial Entries" */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('loads feeds', function() {
            var container = $('.feed');
            expect(container.find('.entry').length).toBeGreaterThan(0);
        });
    });
        

    /* "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var container = $('.feed');

        // Empty out all previous entries
        beforeEach(function() {
              container.empty();  
        });

        it('has no content', function() {
            expect(container.find('.entry').length).toBe(0);
        });

        // Checks if after load content is different
        describe('After load', function() {
            beforeEach(function(done) {
                loadFeed(0, function() {
                    done();
                });
            });

            it('changes content', function() {
                var container = $('.feed');
                expect(container.find('.entry').length).toBeGreaterThan(0);
            });
        });
    });
}());
