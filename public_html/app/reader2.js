(function() {

	var Feed = Backbone.Model.extend({
		defaults : {
			image : "icon-blank",
			title : "Unknown",
			count : 0
		}
	});

	var Feeds = Backbone.Collection.extend({
		model : Feed
	});

	var Item = Backbone.Model.extend({
		defaults : {
			starred : false,
			title : "Unknown",
			feed : null,
			snippet : "",
			author : "",
			publishDate : "",
			content : "",
			tags : null
		}
	});

	var Items = Backbone.Collection.extend({
		model : Item
	});

	var FeedListView = Backbone.View.extend({
		el : $(".feeds"),
		template : _.template($("#feed-template").html()),
		render : function() {
			this.collection.each(function(feed) {
				this.$el.append(this.template(feed.toJSON()));
			}, this);
			return this;
		}
	});
	
	var ItemView = Backbone.View.extend({
		tagName : "li",		
		template : _.template($("#feed-item-template").html()),
		events : {
			"click" : "onItemClick"
		},
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		onItemClick : function( ) {
			this.template = _.template($("#full-feed-item-template").html());
			this.render();
		}
	});

	var ItemListView = Backbone.View.extend({
		el : $(".feed"),
		render : function() {
			this.collection.each(function(item) {
				this.$el.append(new ItemView({model:item}).render().el);
			}, this);
			return this;
		}
	});

	$(function() {

		var starterFeeds = [ new Feed({
			id : "all-items",
			title : "All items",
			image : "icon-folder-open"
		}), new Feed({
			id : "read-items",
			title : "Read items"
		}), new Feed({
			id : "starred-items",
			title : "Starred items",
			image : "icon-star"
		}), new Feed({
			id : "recommended-items",
			title : "Recommended items",
			image : "icon-list-alt"
		}), new Feed({
			id : "the-verge-all-posts",
			title : "The Verge - All Posts",
			image : "icon-list-alt"
		}) ];
		var feeds = new Feeds(starterFeeds);

		var feedListView = new FeedListView({
			collection : feeds
		});
		feedListView.render();

		var starterItems = [
				new Item(
						{
							title : "WebStorm 6 EAP build 126.254",
							feed : {
								id : "the-verge-all-posts",
								title : "The Verge - All Posts"
							},
							snippet : "Please meet the new WebStorm 6 EAP build number1...",
							author : "Joshua Topolsky",
							publishDate : "Feb 15,2013 12:14 PM",
							content : '<img alt="articale image" src=""  /><p>Lorem ipsum dolor sit amet, no nam dicam facilisi. Nam ut corpora pericula expetenda, cum te nulla novum animal. Mea dolor quidam ad, ei has aliquip accusamus definitionem. Ex has tritani philosophia, vim ex fugit exerci. Ex eirmod intellegat definiebas cum, in est audiam adipisci.</p><p>Ignota pericula cu per, essent menandri deseruisse per ex, brute posse cum ea. Scaevola praesent hendrerit has ne, vis et minim integre pertinacia. Vim discere democritum moderatius an, no quo utinam vivendum praesent. Etiam theophrastus concludaturque eos no, graeco adipisci referrentur ut qui, vel probo recteque ad. Eos choro torquatos moderatius in. Possim deleniti pri ne, accusata inciderint dissentiunt nam in.</p><p>Omnes probatus at vis, postea dissentiet definitionem est cu. Eligendi luptatum platonem cu ius. Nam at assueverit interesset, verterem phaedrum ocurreret sea id. At graeci dolorum ius. Cu habeo inani duo, ut falli feugait eam, vim timeam audire in. Euismod insolens mediocritatem sed an.</p><p>Pri ex rebum mediocritatem. Ius iriure erroribus incorrupte ne, id ludus primis vel, vel ex wisi putant intellegat. Duo autem facete integre id. Dolor tempor utamur quo te, et brute nonumy has. Simul dictas te sit, zril vivendo at qui. Pri dicant petentium explicari no, ut adhuc voluptaria mei.</p>',
							tags : null
						}),
				new Item(
						{
							starred : true,
							title : "Apple's Jony Ive receives the greatest accolade in UK children's TV: A golden Blue Peter badge",
							feed : {
								id : "the-verge-all-posts",
								title : "The Verge - All Posts"
							},
							snippet : "As Apple's design chief, Jony Ive has won his fair share of awards and accolades...",
							author : "Tom Warren",
							publishDate : "Feb 15,2013 12:15 PM",
							content : '<img alt="articale image" src=""  /><p>Lorem ipsum dolor sit amet, no nam dicam facilisi. Nam ut corpora pericula expetenda, cum te nulla novum animal. Mea dolor quidam ad, ei has aliquip accusamus definitionem. Ex has tritani philosophia, vim ex fugit exerci. Ex eirmod intellegat definiebas cum, in est audiam adipisci.</p><p>Ignota pericula cu per, essent menandri deseruisse per ex, brute posse cum ea. Scaevola praesent hendrerit has ne, vis et minim integre pertinacia. Vim discere democritum moderatius an, no quo utinam vivendum praesent. Etiam theophrastus concludaturque eos no, graeco adipisci referrentur ut qui, vel probo recteque ad. Eos choro torquatos moderatius in. Possim deleniti pri ne, accusata inciderint dissentiunt nam in.</p><p>Omnes probatus at vis, postea dissentiet definitionem est cu. Eligendi luptatum platonem cu ius. Nam at assueverit interesset, verterem phaedrum ocurreret sea id. At graeci dolorum ius. Cu habeo inani duo, ut falli feugait eam, vim timeam audire in. Euismod insolens mediocritatem sed an.</p><p>Pri ex rebum mediocritatem. Ius iriure erroribus incorrupte ne, id ludus primis vel, vel ex wisi putant intellegat. Duo autem facete integre id. Dolor tempor utamur quo te, et brute nonumy has. Simul dictas te sit, zril vivendo at qui. Pri dicant petentium explicari no, ut adhuc voluptaria mei.</p>',
							tags : null
						}) ];
		var items = new Items(starterItems);

		var itemListView = new ItemListView({
			collection : items
		});
		itemListView.render();

	});

})();