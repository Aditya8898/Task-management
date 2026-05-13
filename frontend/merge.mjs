import { Jimp } from "jimp";

async function mergeImages() {
    try {
        console.log("Reading images...");
        const bg = await Jimp.read('Task-Manager/public/bg-img.png');
        const fg = await Jimp.read('Task-Manager/src/assets/images/auth-img.png');
        
        console.log(`BG: ${bg.bitmap.width}x${bg.bitmap.height}`);
        console.log(`FG: ${fg.bitmap.width}x${fg.bitmap.height}`);
        
        // The original CSS was <img src={UI_IMG} className="w-64 lg:w-[90%]" />
        // It was centered in the div. 
        // We will resize the fg image to be about 85-90% of the background's width, or keep it if it fits.
        let fgTargetW = Math.floor(bg.bitmap.width * 0.9);
        if (fg.bitmap.width > fgTargetW) {
             fg.resize({ w: fgTargetW });
        }
        
        const x = (bg.bitmap.width - fg.bitmap.width) / 2;
        const y = (bg.bitmap.height - fg.bitmap.height) / 2;
        
        console.log(`Compositing at ${x}, ${y}`);
        bg.composite(fg, x, y);
        
        await bg.write('Task-Manager/src/assets/images/merged-auth-img.png');
        console.log('Successfully merged images to Task-Manager/src/assets/images/merged-auth-img.png');
    } catch (err) {
        console.error("Error:", err);
    }
}

mergeImages();
