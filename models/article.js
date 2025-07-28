import mongoose from 'mongoose';
import slugify from 'slugify'; // Importando o slugify para criar slugs a partir dos títulos
import { marked }from 'marked'; // Importando o marked para converter markdown em HTML
import { JSDOM } from 'jsdom';
import dompurify from 'dompurify';

const dompurifyJS = dompurify(new JSDOM().window);

// Criando o Schema Mongoose para os artigos
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
});

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    if (this.markdown) {
        this.sanitizedHTML = dompurifyJS.sanitize(marked(this.markdown));
    }
    next();

});

export default mongoose.model('Article', articleSchema);