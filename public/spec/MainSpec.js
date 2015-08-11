describe("Navigation exercise", function() {
    var load,
        templatizate,
        mockResponse,
        appSpec;

    $.ajaxSetup({async: false});
    

    beforeEach(function() {
        deferred = new jQuery.Deferred();
        mockResponse = $.getJSON('/api/nav.json');
        spyOn($, 'ajax');

    });

    it("should load the vav.json request", function() {
        deferred.resolve(mockResponse.responseJSON);
        mockResponse.responseJSON;
        expect($.ajax).toHaveBeenCalled();
    });

    xit("should show information after the templatization process", function() {
        $spyOn(appSpec, 'jsonRequest');

        expect(appSpec.templatizate(deferred)).toEqual(jasmine.any(Object))
    });

});
