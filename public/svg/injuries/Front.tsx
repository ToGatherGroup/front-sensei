'use client'
import { useEffect } from "react";

type FrontProps = {
    injuries: string[];
    width?: string;
};
  
const Front = ({ injuries, width}: FrontProps) => {
   
    useEffect(() => {
        
        if(injuries) {
            const injuredAreas = document.querySelectorAll("path");
            
            injuredAreas.forEach((area) => {
                const dataId = area.getAttribute("data-id");
                
                if (dataId !== null && injuries.includes(dataId)) {
                    area.style.fill = "red";
                } else {
                    area.style.fill = "#90a2a2";
                }
            });
        }

    }, [injuries]);

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={width ? width : "148mm"}
            height="105mm"
            style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                fillRule: "evenodd",
                clipRule: "evenodd",
            }}
            viewBox="0 0 21000 29700">
            <defs>
                <style>
                    {
                        ".fil0{fill:#90a2a2}.fil1{fill:#90a2a2}.fil2{fill:#90a2a2}.fil3{fill:#90a2a2}.fil7{fill:#90a2a2}.fil4{fill:#90a2a2}.fil6{fill:#90a2a2}.fil5{fill:#90a2a2}"
                    }
                </style>
            </defs>
            <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"/>
            <g id="_2782317231984">
            <path className="fil0" data-id="ANTERIOR_CABECA" d="M9987.66 3189.45l-417.96 0c-295,152.32 -851.61,115.06 -846.32,1144.19 2.27,442.29 -178.31,346.7 10.63,830.39 80.19,205.25 124.62,183.61 200.34,301.08 75.73,117.45 75.71,272.84 113.97,413.42 131.1,78.37 561.81,315.26 730.36,315.26 168.55,0 599.26,-236.89 730.36,-315.26 34.18,-125.61 39.24,-280.47 100.54,-391.17 24.4,-44.06 313.72,-346.53 304.34,-689.04 -4.7,-171.29 -19.63,-70.08 -55.5,-188 -75.26,-247.63 60.64,-628.57 -210.22,-1038.22 -187.15,-283.07 -508.03,-303.9 -660.54,-382.65z"/>
            <path className="fil1" data-id="ANTERIOR_TORAXICA" d="M7523.77 8485.4c164.07,240.85 237.44,512.63 401.07,780.63 74.91,122.68 209.47,380.49 318.14,432.81 87.06,41.93 277.24,42.01 407.58,60.7 273.53,39.23 200.52,-14.65 354.73,-115.08 112.55,-73.32 506.69,-202.96 701.31,-254.33 -4.09,-786.77 83.32,-637.84 -102.13,-1267.72 -191.01,-648.84 -240.23,-828.94 -1471.83,-825.39 -23.12,30.19 -9.27,4.26 -45.54,67.64l-563.33 1120.74z"/>
            <path className="fil1" data-id="ANTERIOR_TORAXICA" d="M9850.75 9390.13c836.87,220.87 742.42,408.46 1024.89,374.9 74.33,-8.82 375.65,-35.8 438.74,-66.19 107.84,-51.93 232.27,-291.77 304.33,-410.62 43.71,-72.08 56.45,-87.59 92.24,-159.47 107.85,-216.69 191.29,-450.56 322.64,-643.35 -327.33,-480.08 -495.21,-1040.09 -608.87,-1188.38 -454.12,-1.31 -1217.87,-7.44 -1364.07,467.22l-208.6 686.61c-25.98,257.46 -0.85,665.17 -1.3,939.28z"/>
            <path className="fil0" d="M8861.24 12603.17c-124.11,85.22 -39.72,-5.49 -78.3,91.88l666.97 2668.06c43.47,221.12 86.42,212.86 150.97,366.77l355.58 -10.04c205.92,-455.29 98.63,-126.08 222.94,-713.04 108.87,-513.94 221.93,-1089.99 371.19,-1562.44 71.63,-226.69 189.89,-492.98 223.83,-749.31 -38.58,-97.37 45.8,-6.66 -78.3,-91.88 -490.47,21.22 -744.59,-311.42 -917.44,-310.97 -175.98,0.44 -425.8,332.23 -917.44,310.97z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_DIREITO" d="M8285.23 19004.08c37.47,-298.57 351.73,-2178.88 331.63,-2269.31 -32.29,-145.23 -393.34,-1103.2 -540.89,-1752.76l-49.52 -200.08c-35.03,-89.97 -10.75,-30.96 -35.72,-69.03 -208.91,296.82 -365.29,531.01 -424.81,970.44 -46.69,344.76 -147.76,937.01 -106.47,1312.32 37.12,337.35 517.36,1517.22 745.13,1901.88l28.54 45.01c35.92,50.78 13.63,24.49 52.11,61.53z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_ESQUERDO" d="M11272.13 19004.08l128.43 -201.72c193.11,-389.63 655.18,-1423.3 697.35,-1806.7 41.2,-374.6 -58.6,-942.8 -102.66,-1280.33 -61.45,-470.48 -209.02,-690.44 -428.62,-1002.43l-288.01 1033.69c-51.2,168.21 -108.51,326.78 -159.02,484.97 -48.5,151.9 -146.3,355.69 -179.1,503.21 -20.11,90.43 294.16,1970.74 331.63,2269.31z"/>
            <path className="fil0" data-id="ANTERIOR_CRURAL_DIREITO" d="M7795.96 24644.15c123.89,-756.78 -312.92,-1420.87 442.15,-2885.18 213.32,-413.71 276.47,-358.55 312.52,-540.68 16.94,-85.6 24.91,-189.79 40.49,-280.28 -121.43,-88.75 -362.38,-211.83 -518.48,-297.13 -213.26,-116.54 -360.03,-170.42 -644.31,-84.61 -184.78,55.79 -217.34,195.72 -255.3,564.53 -22.96,223.18 138.25,2000.87 183.04,2311.65 96.25,668.02 200.46,709.73 439.89,1211.7z"/>
            <path className="fil0" data-id="ANTERIOR_CRURAL_ESQUERDO" d="M10966.24 20938.01c15.19,88.24 22.25,160.17 36.21,248.84 35.64,226.23 66.23,99.95 304.67,548.4 765.82,1440.3 332.38,2164.34 454.28,2908.9 236.42,-495.64 336.68,-528.3 435.26,-1180.62 47.53,-314.55 207.28,-2072.48 190.69,-2309.18 -8.18,-116.78 -42.13,-222.12 -63.09,-330.59 -39.23,-202.96 0.89,-200.63 -166.93,-259.39 -419.06,-146.75 -622.97,64.18 -921.21,220.85 -106.6,55.98 -184.29,90.25 -269.88,152.79z"/>
            <path className="fil0" data-id="ANTERIOR_BRACO_DIREITO" d="M6022.27 11597.7c363.86,-0.45 534.3,-180.26 771.71,-336.18 240.46,-157.92 216.63,-99.72 269.86,-267.36 45.68,-143.95 83.21,-302.03 130.82,-440.5 39.61,-115.21 132.22,-267.37 120.05,-371.84 -14.06,-120.62 -66.95,32.68 -4.02,-187.7 161.76,-566.54 115.83,-603.62 101.06,-1324.57 -96.74,76.44 -165.75,189.77 -273.41,289.54 -116.33,107.81 -185.33,177.56 -298.62,272.88 -275.72,232.02 -364.98,215.31 -570.47,575.3 -161.66,283.16 -436.93,938.45 -343.42,1276.92 44.55,161.23 72.4,343.27 96.44,513.51z"/>
            <path className="fil0" data-id="ANTERIOR_BRACO_ESQUERDO" d="M13535.09 11597.7c22.72,-160.91 45.01,-325.67 88.3,-485.38 102.3,-377.43 -137.47,-964.15 -322.11,-1282.35 -226.8,-390.89 -442.45,-465.03 -863.46,-853.74 -113.42,-104.72 -194.78,-229.72 -292.21,-306.68 -29.4,1433.75 105.81,1170.66 117.75,1402.02 13.86,267.99 -131.61,-161.35 90.03,455.94 213.26,593.9 49.86,498.78 388.47,719.79 239.55,156.36 423.81,349.95 793.23,350.4z"/>
            <path className="fil2" data-id="ANTERIOR_MAO_ESQUERDA" d="M14859.07 15390.74c122.24,-55.48 218.9,50.03 456.1,-45.11 151.76,-60.84 253.59,-150.97 368.92,-98.73 -71.47,115.28 -219.19,174.96 -384.01,225.41 -134.74,41.22 -373.21,88.06 -441.01,-81.57zm-194.66 -855.95c-10.43,355.57 43.41,608.51 74.67,944.74 19.9,214.24 -44.24,776.47 85.04,898.15 138.37,-152.25 52.05,-453.28 165.45,-717.08 2.72,-6.31 8.15,-17.93 13.47,-26.19 180.84,223 299.03,868.17 500.97,1022.17 25.74,-37.71 20.19,22.08 48.12,-98.4 10.39,-44.75 4.06,-93.27 -1.66,-135.93 -13.09,-97.74 -34.06,-178.29 -57.43,-268.89 -43.82,-169.91 -114.11,-336.54 -141.48,-514.46 119.41,95.76 243.21,335.09 330.19,469.1 101.13,155.71 207.65,351.37 366.32,433.77 16.64,-378.45 -288.58,-766.41 -400.13,-1079.03 164.8,92.11 501.32,621.83 711.33,705.39 21.04,-207.24 -334.79,-674.82 -508.52,-979.11 -72.44,-126.84 -66.51,-93.37 -228.72,-129.68 -256.65,-57.43 -672.34,-180.22 -691.9,-492.34 150.03,41.71 164.54,134.15 281.55,222.31 224.46,169.11 475.67,88.02 768.23,305.79 121.55,90.47 196.98,168.55 321.49,219.65 -120.76,-383.48 -762.62,-827 -1083.66,-1103.64 -188.39,97.52 -359.83,225.36 -553.33,323.68z"/>
            <path className="fil2" data-id="ANTERIOR_MAO_DIREITO" d="M4482.77 15504.63c-198.41,3.95 -515.47,-106.06 -609.5,-257.73 65.89,-71.49 289.86,70.73 393.56,109.82 211.93,79.89 310.72,-20.77 431.46,34.02 -17.73,44.35 46.9,108.67 -215.52,113.89zm-1226.81 -189.88c276.33,-113.39 230.85,-260.2 669.32,-373.68 153.32,-39.68 288.91,-61.89 399.65,-136.7 131.92,-89.1 145.47,-193.77 302.3,-237.37 -24.1,384.8 -605.95,456.69 -781.49,510.76 -175.63,54.08 -108.04,89.56 -247.91,323.47 -50.95,85.24 -98.87,148.33 -159.56,233.65 -92.89,130.58 -258.58,351.87 -240.18,533.25 210.01,-83.56 546.53,-613.28 711.33,-705.39 -111.55,312.62 -416.77,700.58 -400.13,1079.03 197.78,-102.71 377.17,-463.28 517.59,-675.86 19.02,-28.8 57.81,-89.76 70.22,-107.31l108.69 -119.7c-30.02,195.25 -229.41,720.89 -205.18,893.98l92.76 84.84c193.24,-237.83 278.97,-758.91 460.95,-983.31 16.03,24.81 12.44,3.76 37.1,79.73 67.62,208.31 18.65,528.03 141.82,663.54 129.28,-121.68 65.14,-683.91 85.04,-898.15 31.26,-336.23 85.1,-589.17 74.67,-944.74 -193.51,-98.32 -364.94,-226.16 -553.33,-323.68 -124.33,107.13 -130.64,141.45 -286.27,249.41 -279.29,193.75 -698.94,541.59 -797.39,854.23z"/>
            <path className="fil0" d="M7733.16 13530.02c692.02,508.95 1057.83,1017.61 1572.32,1720.69 -59.32,-453.77 -337.84,-1569.68 -478.8,-2019.72l-195.09 -590.88c-46.01,-56.37 -123.82,-58.7 -210.12,-77.08 -123.66,-26.33 -132.2,-26.37 -233.24,-89.38 -136.61,-85.18 -246.45,-167.15 -364.9,-253.94l-90.17 1310.31z"/>
            <path className="fil0" d="M10251.88 15250.71c514.49,-703.08 880.3,-1211.74 1560.62,-1719.88l-80.42 -1310.97c-783.73,583.65 -774.16,211.35 -830.35,511.11l-211.98 638.72c-147.46,515.74 -371.39,1372.4 -437.87,1881.02z"/>
            <path className="fil0" data-id="ANTERIOR_PE_ESQUERDO" d="M11963.54 27122.56c210.89,274.79 128.37,272.28 524.06,245.74 -76.9,-97.59 -160.93,-194.37 -249.84,-301.44 -359.03,-432.33 -298.56,-601.85 -281.52,-1228.58 7.04,-259.23 -5.11,-214.68 76.78,-247.91 4.81,7.47 10.55,10.75 11.75,23.88 1.21,13.49 8.98,18.92 10.44,25.23l13.74 487.1c-0.61,196.79 -19.42,394.86 33.28,538.89 123.73,338 353.93,394.17 503.05,640.5 192.06,-16.43 373.42,-137.58 515.56,-205.72 148.12,-212.96 76.57,-301.95 -69.52,-489.07 -117.05,-149.91 -227.38,-276.94 -325.91,-425.18 -220.85,-332.26 -399.3,-639.91 -385.35,-1152.9 -133.68,-13.02 -520.38,20.84 -550.93,170.53 -7.96,38.92 -11.42,92.72 -13.09,132.99l-10.12 861.67c18.42,475.62 127.94,563.43 197.62,924.27z"/>
            <path className="fil0" data-id="ANTERIOR_PE_DIREITO" d="M6436.52 27100.25c142.14,68.14 323.5,189.29 515.56,205.72 149.12,-246.33 379.32,-302.5 503.04,-640.5 52.71,-144.03 33.9,-342.1 33.29,-538.89 -0.3,-96.03 -1.19,-191.9 -1.68,-287.87 -0.85,-171.9 -8.56,-176.75 37.61,-248.34 58.73,23.84 68.99,-33.19 76.54,210.91 8.23,266.03 35.25,633.64 -33.47,870.27 -69.73,239.96 -321.19,472.84 -497.65,696.75 395.69,26.54 313.17,29.05 524.06,-245.74 69.68,-360.84 179.2,-448.65 197.62,-924.27 7.02,-181.64 -0.97,-356.88 -6.23,-536.9 -2.84,-96.7 -1.01,-191.68 -3.32,-288.4l-21.85 -196.97c-31.1,-110.76 -438.7,-153.06 -542.74,-142.92 13.77,506.29 -158.56,807.88 -371.21,1131.09 -100.58,152.87 -212.59,284.93 -324.31,427.09 -153.58,195.48 -239.55,287.17 -85.26,508.97z"/>
            <path className="fil0" data-id="ANTERIOR_OMBRO_ESQUERDO" d="M13127.25 9400.28c-27.08,-1068.18 9.94,-2111.01 -1576.8,-2113.54 220.24,266.29 248.82,1178.17 1576.8,2113.54z"/>
            <path className="fil0" data-id="ANTERIOR_OMBRO_DIREITO" d="M6430.11 9400.28c282.07,-198.68 749.29,-599.24 943.26,-885.71 214.91,-317.41 632.27,-1226.29 633.54,-1227.83 -1581.08,2.53 -1549.37,1031.73 -1576.8,2113.54z"/>
            <path className="fil0" data-id="ANTERIOR_ANTEBRACO_DIREITO" d="M6023.49 11707.95c-9.8,886.54 -1258.93,2303.65 -1360.99,2573.51 96.85,52.34 158.11,96.18 263.15,141.8 127.45,-331.41 521.44,-909.67 754.79,-1161.78 347.69,-375.71 1013.97,-357.13 1309.19,-1985.88 -304.2,172.33 -528.64,423.95 -966.14,432.35z"/>
            <path className="fil0" data-id="ANTERIOR_ANTEBRACO_ESQUERDO" d="M14631.71 14423.26c105.04,-45.62 166.3,-89.46 263.14,-141.8 -99.33,-262.67 -1351.2,-1688.15 -1360.98,-2573.51 -437.5,-8.4 -661.94,-260.02 -966.14,-432.35 292.01,1611.02 937.46,1600.96 1291.99,1967.54 239.35,247.49 647.96,857.64 771.99,1180.12z"/>
            <path className="fil0" d="M9707.8 8091.77c3.57,1.32 10.65,-4.76 11.38,-0.79l44.39 14.04c3.85,1.99 24.56,264.42 164.63,-292.9l197.51 -626.04c246.97,-601.49 407.05,-684.46 384.47,-1185.43 -76.3,64.04 -520.1,317.45 -731.5,317.49 -211.25,0.04 -655.23,-253.47 -731.5,-317.49 -22.35,496.05 63.76,452.03 217.2,781.46 144.45,310.11 369.78,987.67 443.42,1309.66z"/>
            <path className="fil0" data-id="ANTERIOR_ANTEBRACO_DIREITO" d="M4380.94 14058.06c67.82,97.37 66.37,74.57 165.86,145.14 264.15,-296.25 1180.72,-1692.43 1307.81,-2127.29 71.59,-244.99 70.29,-792.74 -48.95,-972.72 -240.81,394.48 -620.19,602.35 -760.3,1416.14 -85.24,495.18 -414.7,1175.82 -664.42,1538.73z"/>
            <path className="fil0" data-id="ANTERIOR_ANTEBRACO_ESQUERDO" d="M15010.56 14203.2c99.48,-70.57 98.04,-47.77 165.86,-145.14 -742.68,-1079.36 -538.42,-1614.29 -953.51,-2323.37 -150.68,-257.39 -337.35,-412.23 -471.21,-631.5 -119.24,179.98 -120.54,727.73 -48.95,972.72 127.09,434.86 1043.65,1831.04 1307.81,2127.29z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_ESQUERDO" d="M9980.36 15820.98l171.25 1137.64 1211.15 -2451.62c96.79,-103.15 61.59,7.89 131.54,-154.9 30.97,-72.1 102.7,-390.74 106.62,-460.71 -123,28.81 -151.66,96.76 -237.33,186.97 -425.75,448.24 -423.42,437.02 -791.64,961.34l-591.59 781.28z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_DIREITO" d="M9415.77 16960.06l153.44 -1140.2c0.39,-4.52 -10.69,-22.8 -13.83,-16.49l-181.42 -221.54c-460.64,-628.63 -571.12,-874.49 -1162.73,-1485.29 -89.58,-92.5 -129.26,-175.75 -254.79,-205.15 29.17,521.46 250.51,596.38 334.31,769.41l762.03 1528.77c125.43,247.85 218.27,553.7 362.99,770.49z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_DIREITO" d="M8975.98 19562.22c150.64,-661.46 172.3,-663.12 41.87,-1336.79 -76.99,-397.63 -185.07,-926.85 -326.36,-1285.25 -80.82,212.17 -455.71,2084.37 -284.36,2291.12 140.5,169.54 511.2,279.27 568.85,330.92z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_ESQUERDO" d="M10581.38 19562.22c64.31,-57.62 379.83,-136.63 551.04,-312.65 141.74,-145.71 53.94,-465.19 7.95,-780.63 -52.7,-361.63 -163.8,-1238.15 -274.5,-1528.76 -141.29,358.4 -249.37,887.62 -326.36,1285.25 -130.43,673.67 -108.77,675.33 41.87,1336.79z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_DIREITO" d="M9174.45 18585.67c75.69,-369.55 117.17,-781.02 172.75,-1160.08 42.44,-289.33 1.53,-295.09 -93.88,-506.94 -206.85,-459.36 -832.03,-1867.98 -1113.86,-2249.65 8.36,226.61 177.28,767.65 236.37,980.71 219.89,792.74 322.72,920.78 559.27,1910.76 65.79,275.4 112.24,804.31 239.35,1025.2z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_ESQUERDO" d="M10382.91 18585.67c98.04,-170.38 316.68,-1481.83 491.07,-1991.46 106.56,-311.45 216.12,-611.9 299.94,-916.41 44.67,-162.34 83.07,-297.75 128.76,-479.77 40.99,-163.38 109.42,-371.69 115.22,-529.03 -140.21,189.89 -350.6,629.52 -467.52,857.39l-635.06 1367.58c-134.78,304.83 -150.18,224.25 -110.16,498.27 57.19,391.64 99.79,812.77 177.75,1193.43z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_DIREITO" d="M7702.97 19041.2c65.43,-119.2 115.55,-190.48 111.55,-392.85 -9.89,-499.27 -377.45,-851.83 -499.18,-2010.22 -20.35,-193.49 -22.18,-274.73 -49.87,-454.52l-77.26 -313.94c-50.15,-99.24 -30.17,-57.03 -72.24,-103.04 -29.66,637.32 -94.02,1217.81 -9.27,1871.49 72.3,557.43 173.72,1110.05 596.27,1403.08z"/>
            <path className="fil0" data-id="ANTERIOR_FERMURAL_ESQUERDO" d="M11854.39 19041.2c418.67,-290.35 517.24,-820.7 592.03,-1371.51 90.58,-667.05 25.24,-1252.8 -5.03,-1903.06 -163.38,178.64 -177.48,611.31 -196.38,838.59 -118.55,1426.43 -755.08,1771.97 -390.62,2435.98z"/>
            <path className="fil0" data-id="ANTERIOR_ABDOMINAL" d="M8561.18 11275.62c3.51,-792.23 115.18,-958.51 -515.66,-1450.4 -146.12,-113.92 -257.18,-159.71 -520.21,-158 -19.25,38.88 -64.14,196.48 -73.55,258.66 -40.92,270.2 70.75,152.75 336.88,728.84 81.99,177.5 161.29,98.28 584.63,452.57 80.07,67.01 105.3,109.22 187.91,168.33z"/>
            <path className="fil0" data-id="ANTERIOR_ABDOMINAL" d="M10996.18 11275.62c131.37,-94.02 385.14,-371.55 579.66,-456.65 176.1,-77.04 114.37,5.66 192.88,-164.25 230.14,-498.17 483.45,-542.82 263.33,-987.5 -545.87,-3.53 -1037.15,535.92 -1037.59,927.37 -0.27,226.59 0.71,454.36 1.72,681.03z"/>
            <path className="fil2" data-id="ANTERIOR_CRURAL_ESQUERDO" d="M11790.55 25008.13l565.01 -98.95c74.11,-753.37 538.87,-2916.08 115.41,-3497.46 -65.79,754.64 -30.96,1103.82 -151.8,1993.67 -54.59,402 -176.69,874.39 -371.98,1239.59 -71.48,133.64 -167.86,178.13 -156.64,363.15z"/>
            <path className="fil2" data-id="ANTERIOR_CRURAL_DIREITO" d="M7201.7 24909.73l565.6 95.52c11.08,-187.96 -169.93,-312.56 -320.82,-733.81 -337.41,-941.96 -280.14,-1942.81 -360.09,-2859.72 -423.46,581.38 41.3,2744.09 115.31,3498.01z"/>
            <path className="fil0" data-id="ANTERIOR_ABDOMINAL" d="M8724.01 11722.84c222.59,-100.52 650.38,-248.54 979.13,-271.54l3.69 -996.35c-110.03,52.84 -107.15,19.37 -232.96,52.03 -192.82,50.08 -646.22,379.5 -723.16,460.18 -118.41,124.13 -60.58,593.68 -26.7,755.68z"/>
            <path className="fil0" data-id="ANTERIOR_ABDOMINAL" d="M9851.55 11451.3c331.42,23 759.21,171.02 981.8,271.54 28.8,-137.82 29.23,-393.4 34.42,-539.52 8.44,-237.42 -316.88,-434.39 -559.88,-578.77 -253.31,-150.48 -318.44,-82.8 -456.67,-149.6l0.33 996.35z"/>
            <path className="fil0" data-id="ANTERIOR_ABDOMINAL" d="M8679.99 10872.28c440.34,-320.41 498.42,-415.55 1027.12,-526.29l-0.91 -821.71c-551.85,136.46 -840.19,223.69 -1011.54,775.2 -51.18,164.78 -13.74,386.13 -14.67,572.8z"/>
            <path className="fil0" data-id="ANTERIOR_ABDOMINAL" d="M9850.21 9737.81l0.52 608.18c528.26,110.82 586.58,206.08 1026.64,526.29 -2.6,-512.19 22.72,-642.12 -203.51,-956.34 -170.8,-237.22 -510.61,-314.49 -822.56,-391.66l-1.09 213.53z"/>
            <path className="fil0" data-id="ANTERIOR_CRURAL_DIREITO" d="M7932.22 24117.98c455.27,-1026.65 637.48,-1288.18 590.23,-2603.5 -194.42,257.85 -417.84,722.98 -511.07,1090.8 -88.71,349.95 -139.22,1073.78 -79.16,1512.7z"/>
            <path className="fil0" data-id="ANTERIOR_CRURAL_ESQUERDO" d="M11625.14 24117.98c60.06,-438.92 9.55,-1162.75 -79.16,-1512.7 -93.23,-367.82 -316.66,-832.95 -511.07,-1090.8 -47.25,1315.32 134.96,1576.85 590.23,2603.5z"/>
            <path className="fil3" data-id="ANTERIOR_FERMURAL_ESQUERDO" d="M12192.42 16053.21c108.45,-610.17 499.15,-310.61 -156.09,-1774.16 -74.29,-165.94 -146.49,-479.09 -208.17,-595.24 -94.07,96.9 -87.66,103.35 -125.21,268.54 -161.71,711.42 -160.96,537.65 73.76,872.81 209.31,298.87 345.53,695.98 415.71,1228.05z"/>
            <path className="fil3" data-id="ANTERIOR_FERMURAL_DIREITO" d="M7364.93 16053.21c202.41,-1534.36 725.22,-1159.61 567.64,-1748.62 -73.78,-275.76 -59.05,-472.15 -203.37,-620.78 -61.04,114.94 -121.61,401.61 -196.97,570.55 -132.06,295.99 -406.81,920 -384.37,1248.58 10.2,149.45 140.23,117.9 217.07,550.27z"/>
            <path className="fil0" data-id="ANTERIOR_ABDOMINAL" d="M9851.28 12169.71c154.98,84.47 499.15,305.32 681.09,324.55 322.08,34.04 288.2,30.55 309.07,-634.49 -325.68,-127.86 -578.99,-264.43 -990.85,-295.79l0.69 605.73z"/>
            <path className="fil2" data-id="ANTERIOR_FERMURAL_ESQUERDO" d="M10590.02 19685.57c25.14,339.81 30.21,632.85 226.37,857.72l51.4 -55.16c3.86,-5.05 11.22,-14.54 15.36,-20.32 142.28,-199.45 347.25,-641.31 352.46,-649.55 48.06,-75.81 435.78,-560.21 545.63,-634.96 -101.84,-295.82 -90.24,-87.57 -156.35,-485.13 -198.45,352.75 -331.99,670.48 -631.99,842.06 -225.24,128.81 -256.11,64.14 -402.88,145.34z"/>
            <path className="fil0" data-id="ANTERIOR_ABDOMINAL" d="M8715.92 11859.77c22.15,705.73 -82.08,895.42 989.83,309.94l0.59 -605.73c-411.43,31.36 -664.74,167.93 -990.42,295.79z"/>
            <path className="fil2" data-id="ANTERIOR_FERMURAL_DIREITO" d="M7776.12 19183.3c169.61,115.43 284.75,296.31 399.12,459.79 206.29,294.88 60.11,-4.72 221.38,351.41l344.35 548.79c196.16,-224.87 201.23,-517.91 226.37,-857.72 -8.87,-4.91 -22.99,-20.28 -28,-11.88l-352.2 -120.52c-133.82,-72.6 -192.89,-117.31 -274.42,-225.88 -128.61,-171.29 -257.71,-411.31 -380.25,-629.12 -66.12,397.56 -54.51,189.31 -156.35,485.13z"/>
            <path className="fil1" data-id="ANTERIOR_JOELHO_DIREITO" d="M7595.26 20401.88c226.34,-3.19 314.55,46.35 495.29,118.04 32.09,12.72 143.03,117.78 181.86,-121.06 30.06,-184.91 -0.83,-402.27 -92.26,-544.53 -174.6,-271.67 -246.35,-417.66 -472.37,-414.7 -64,222.9 -108.02,685.88 -112.52,962.25z"/>
            <path className="fil1" data-id="ANTERIOR_JOELHO_ESQUERDO" d="M11962.1 20401.88c-4.5,-276.37 -48.52,-739.35 -112.52,-962.25 -324.33,-4.24 -671.82,609.7 -553.19,1023.53 72.95,254.5 160.56,-68.38 665.71,-61.28z"/>
            <path className="fil1" data-id="ANTERIOR_ABDOMINAL" d="M10924.29 12456.79c291.36,-0.14 448.37,-80.41 705.11,-296.17 152.3,-127.98 93.62,-184.21 74.38,-658.91 -128.3,16.43 -179.73,61.32 -269.08,142.32 -362.57,328.73 -509.34,306.37 -510.41,812.76z"/>
            <path className="fil1" data-id="ANTERIOR_ABDOMINAL" d="M7832.78 12063.8c210.83,237.06 452.53,392.81 800.29,392.99 -0.85,-402.99 -48.91,-393.86 -259.27,-598.57 -91.63,-89.17 -140.09,-112.68 -232.8,-196.56 -96.98,-87.78 -143.74,-141.52 -284.81,-159.85l-23.41 561.99z"/>
            <path className="fil1" data-id="ANTERIOR_ABDOMINAL" d="M10974.7 11905.43c61.14,-90.05 221.98,-211.88 321.93,-292.21 189.37,-152.23 158.41,-140.1 402.08,-242.17l21.34 -488.91c-239.75,84.07 -666.7,495.86 -717.6,616.1 -47.22,111.51 -53.09,255.09 -27.75,407.19z"/>
            <path className="fil1" data-id="ANTERIOR_ABDOMINAL" d="M7860.69 11370.94c225.26,95.33 586,334.21 721.97,534.49 64.97,-390.17 -61.14,-470.95 -227.81,-636.44 -141.73,-140.76 -279.33,-303.33 -519.47,-386.75l25.31 488.7z"/>
            <path className="fil2" d="M10209.79 7357.96c423.99,-141.45 707.28,-141.77 891.84,-209 -566.46,-367.92 -320.62,-304.04 -563.82,-623.99 -88.91,248.16 -255.46,471.04 -328.02,832.99z"/>
            <path className="fil2" d="M8455.73 7148.96c150.95,54.99 292.12,59.46 456.51,90.68 143.85,27.32 258.7,59.39 435.33,118.32 -72.56,-361.95 -239.11,-584.83 -328.02,-832.99 -88.87,116.93 -109.85,243.59 -223.42,369.57 -129.59,143.72 -193.59,159.08 -340.4,254.42z"/>
            <path className="fil3" data-id="ANTERIOR_JOELHO_DIREITO" d="M7290.53 20447.38l162.5 -21.1c55.28,-90.47 36.74,-507.87 56.26,-646.52 34.67,-246.31 47.59,-434.32 265.07,-452.47l-377.01 -388.45 -106.82 1508.54z"/>
            <path className="fil3" data-id="ANTERIOR_JOELHO_ESQUERDO" d="M11774.32 19318.48c226.16,26.96 239.08,214.97 273.75,461.28 19.52,138.65 0.98,556.05 56.52,644.68l161 24.85 -116.35 -1503.17 -374.92 372.36z"/>
            <path className="fil5" data-id="ANTERIOR_PE_DIREITO" d="M6952.08 27305.97l4.55 65.72 113.13 -3.39c176.46,-223.91 427.92,-456.79 497.65,-696.75 68.72,-236.63 41.7,-604.24 33.47,-870.27 -7.55,-244.1 -17.81,-187.07 -76.54,-210.91 -46.17,71.59 -38.46,76.44 -37.61,248.34 0.49,95.97 1.38,191.84 1.68,287.87 0.61,196.79 19.42,394.86 -33.29,538.89 -123.72,338 -353.92,394.17 -503.04,640.5z"/>
            <path className="fil5" data-id="ANTERIOR_PE_ESQUERDO" d="M12487.6 27368.3l113.42 4.79 4.26 -67.12c-149.12,-246.33 -379.32,-302.5 -503.05,-640.5 -52.7,-144.03 -33.89,-342.1 -33.28,-538.89l-13.74 -487.1c-1.46,-6.31 -9.23,-11.74 -10.44,-25.23 -1.2,-13.13 -6.94,-16.41 -11.75,-23.88 -81.89,33.23 -69.74,-11.32 -76.78,247.91 -17.04,626.73 -77.51,796.25 281.52,1228.58 88.91,107.07 172.94,203.85 249.84,301.44z"/>
            <path className="fil2" data-id="ANTERIOR_TORAXICA" d="M11533.55 9664.76c275.84,-143.54 131.67,-102.36 498.33,-107.03l-8.68 -805.09 -489.65 912.12z"/>
            <path className="fil2" data-id="ANTERIOR_TORAXICA" d="M7523.99 9557.71c370.32,4.71 231.06,-32.8 499.82,107.05 -20.26,-75.87 -341.93,-571.08 -482.61,-912.04l-17.21 804.99z"/>
            <path className="fil6" d="M3873.27 15246.9c94.03,151.67 411.09,261.68 609.5,257.73 262.42,-5.22 197.79,-69.54 215.52,-113.89 -120.74,-54.79 -219.53,45.87 -431.46,-34.02 -103.7,-39.09 -327.67,-181.31 -393.56,-109.82z"/>
            <path className="fil6" d="M14859.07 15390.74c67.8,169.63 306.27,122.79 441.01,81.57 164.82,-50.45 312.54,-110.13 384.01,-225.41 -115.33,-52.24 -217.16,37.89 -368.92,98.73 -237.2,95.14 -333.86,-10.37 -456.1,45.11z"/>
            <path className="fil7" data-id="ANTERIOR_JOELHO_ESQUERDO" d="M10964.92 20822.97c58.93,-52.42 74.21,-60.74 135.12,-101.37l145.9 -105.65c-89.58,-161.13 -72.66,-163.56 -71.77,-393.56l-84 131.09c-116.24,223.58 -270.37,323.98 -125.25,469.49z"/>
            <path className="fil7" data-id="ANTERIOR_JOELHO_DIREITO" d="M8311.42 20615.95l145.9 105.65c60.91,40.63 76.19,48.95 135.12,101.37 109.13,-109.44 55.88,-168.45 -17.98,-291.18 -50.1,-83.28 -50.38,-67.51 -96.09,-153.93l-78.52 -136.02c-3.11,-4.23 -10.94,-13.1 -16.66,-19.45 0.89,230 17.81,232.43 -71.77,393.56z"/>
            <path className="fil1" data-id="ANTERIOR_ABDOMINAL" d="M8598.46 10239.41c46.9,-132.14 111.21,-256.18 176.87,-357.07l-464.09 -46.57 287.22 403.64z"/>
            <path className="fil1" data-id="ANTERIOR_ABDOMINAL" d="M10782.05 9882.53c65.64,100.7 129.95,224.74 176.85,356.88l288.05 -395.4 -464.9 38.52z"/>
            <path className="fil4" d="M10774.42 12695.05l45.62 -89.75 -123.92 -2.13c124.1,85.22 39.72,-5.49 78.3,91.88z"/>
            <path className="fil4" d="M8782.94 12695.05c38.58,-97.37 -45.81,-6.66 78.3,-91.88l-116.38 -0.18 38.08 92.06z"/>
            </g>
            </g>
        </svg>
    )
}

export default Front
