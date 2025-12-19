
const fs = require('fs');
const path = require('path');

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            walk(file);
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx')) {
                let content = fs.readFileSync(file, 'utf8');
                let newContent = content.replace(/from\s+['"](.+?)\.tsx?['"]/g, (match, p1) => {
                    return `from "${p1}"`;
                });
                // Also handle dynamic imports or require if any (less likely in this codebase but good to have)
                // And simple imports like import "./foo.ts"
                newContent = newContent.replace(/import\s+['"](.+?)\.tsx?['"]/g, (match, p1) => {
                    return `import "${p1}"`;
                });

                // Handle single quotes too
                newContent = newContent.replace(/from\s+'(.+?)\.tsx?'/g, (match, p1) => {
                    return `from '${p1}'`;
                });
                newContent = newContent.replace(/import\s+'(.+?)\.tsx?'/g, (match, p1) => {
                    return `import '${p1}'`;
                });


                if (content !== newContent) {
                    console.log(`Fixing imports in ${file}`);
                    fs.writeFileSync(file, newContent, 'utf8');
                }
            }
        }
    });
}

walk('./src');
console.log('Done fixing imports.');
