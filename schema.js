var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true},
    name: {type: 'string', maxlength: 150, nullable: false},
    about_yourself: {type: 'text', maxlength: 500, nullable: true},
    lat: {type: 'float', nullable: false},
    lng: {type: 'float', nullable: false},
    formatted_address: {type: 'text', nullable: false},    
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
    user_locations: {
    id: {type: 'increments', nullable: false, primary: true},
    user_id: {type: 'integer', nullable: false, unique: true},
    comment: {type: 'text', maxlength: 500, nullable: true},
    lat_start: {type: 'float', nullable: false},
    lng_start: {type: 'float', nullable: false},
    formatted_address_start: {type: 'text', nullable: false},
    lat_end: {type: 'float', nullable: false},
    lng_end: {type: 'float', nullable: false},
    formatted_address_end: {type: 'text', nullable: false},    
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  categories: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 150, nullable: false}
  },
  posts: {
    id: {type: 'increments', nullable: false, primary: true},
    user_id: {type: 'integer', nullable: false, unsigned: true},
    category_id: {type: 'integer', nullable: false, unsigned: true},
    title: {type: 'string', maxlength: 150, nullable: false},
    slug: {type: 'string', maxlength: 150, nullable: false, unique: true},
    html: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
  },
  tags: {
    id: {type: 'increments', nullable: false, primary: true},
    slug: {type: 'string', maxlength: 150, nullable: false, unique: true},
    name: {type: 'string', maxlength: 150, nullable: false}
  },
  posts_tags: {
    id: {type: 'increments', nullable: false, primary: true},
    post_id: {type: 'integer', nullable: false, unsigned: true},
    tag_id: {type: 'integer', nullable: false, unsigned: true}
  }
};
module.exports = Schema;