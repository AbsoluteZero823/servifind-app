const pdf = require('html-pdf');
const fs = require('fs');
const ejs = require('ejs');

exports.topServicesPdf = (req, res) => {
    // Mock data for demonstration purposes; Replace this with your database fetch logic
    const data = {
        title: 'PDF Generation Demo',
        description: 'This is a sample PDF generated from MERN stack.',
        // Add more properties as needed for your template
    };
    const sortedService = req.body.sortedService || []
    console.log(req.body, "nice")

    const options = { format: 'Letter' }; // You can customize the PDF options here

    fs.readFile('./backend/htmls/topServices.ejs', 'utf8', (err, template) => {
        if (err) {
            console.error('Error reading template file:', err);
            res.status(500).send('Something went wrong');
        } else {
            const html = ejs.render(template, { data, sortedService });

            pdf.create(html, options).toStream((pdfErr, stream) => {
                if (pdfErr) {
                    console.error('Error generating PDF:', pdfErr);
                    res.status(500).send('Something went wrong');
                } else {
                    res.setHeader('Content-Type', 'application/pdf');
                    stream.pipe(res);
                }
            });
        }
    });
};


exports.monthlyIncomePdf = (req, res) => {
    // Mock data for demonstration purposes; Replace this with your database fetch logic
    const data = {
        title: 'PDF Generation Demo',
        description: 'This is a sample PDF generated from MERN stack.',
        // Add more properties as needed for your template
    };
    const monthlyPremiumCounts = req.body.monthlyPremiumCounts || []
    console.log(req.body, "nice")

    const options = { format: 'Letter' }; // You can customize the PDF options here

    fs.readFile('./backend/htmls/monthlyIncome.ejs', 'utf8', (err, template) => {
        if (err) {
            console.error('Error reading template file:', err);
            res.status(500).send('Something went wrong');
        } else {
            const html = ejs.render(template, { data, monthlyPremiumCounts });

            pdf.create(html, options).toStream((pdfErr, stream) => {
                if (pdfErr) {
                    console.error('Error generating PDF:', pdfErr);
                    res.status(500).send('Something went wrong');
                } else {
                    res.setHeader('Content-Type', 'application/pdf');
                    stream.pipe(res);
                }
            });
        }
    });
};