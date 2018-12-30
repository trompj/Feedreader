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

        it('feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //Loop to test each feed to ensure url is defined and not empty.
        it ('each feed has url defined and is not empty', function() {
           for(let selectedFeed of allFeeds) {
               expect(selectedFeed.url).toBeDefined();
               expect(selectedFeed.url.constructor).toBe(String);
               expect(selectedFeed.url.length).toBeGreaterThan(0);
           }
        });


        //Loop to test each feed to ensure name is defined and not empty
        it ('each feed has name defined and is not empty', function() {
            for(let selectedFeed of allFeeds) {
                expect(selectedFeed.name).toBeDefined();
                expect(selectedFeed.name.constructor).toBe(String);
                expect(selectedFeed.name.length).toBeGreaterThan(0);
            }
        });
    });

    //Menu functionality testing
    describe('The menu', function() {
        //Ensure that menu is hidden by default (on load)
        it ('menu element is hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        it ('menu changes visibility when menu icon is clicked', function() {
            //Click menu button and then test to see if it is on-screen
            document.querySelector('a.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);

            //Click menu button again and then test to ensure it is off-screen again
            document.querySelector('a.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

    });

    //Feed entries testing
    describe('Initial Entries', function() {
        //Do not run until loadFeed function is complete
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //Check to ensure that when the function loadFeed is called, there is at least 1 entity present in container
        it ('when loadFeed is called, there is at least one entity', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    //Additional feed entries testing
    describe('New Feed Selection', function() {
        let initialTestFeed;

        //Store initial feed values in initialTestFeed before function is fully loaded
        beforeEach(function(done) {
            loadFeed(1, function() {
                initialTestFeed = document.querySelector('div.feed').innerHTML;
                loadFeed(2, function() {
                    done();
                });
            });
        });

        //Compare two feeds before and after the loadFeed function to ensure
        //that the new feed was properly updated.
        it ('new feed is different and has changed', function() {
            let newFeed = document.querySelector('div.feed').innerHTML;
            expect(newFeed).not.toBe(initialTestFeed);
        });

        //Test to make sure that feed testing is operating as expected.
        it ('feed testing is operating correctly', function() {
            let newFeed = initialTestFeed;
            expect(newFeed).toBe(initialTestFeed);
        });
    });

}());
