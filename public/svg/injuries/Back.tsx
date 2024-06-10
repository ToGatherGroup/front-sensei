'use client'
import { useEffect } from "react";

type BackProps = {
    injuries: string[];
    width?: string;
    viewBoxSecondValue?: string;
};
  
const Back = ({ injuries, width, viewBoxSecondValue }: BackProps) => {
   
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
        <div className="">
<svg 
            xmlns="http://www.w3.org/2000/svg" 
            xmlSpace="preserve" 
            width={width ? width : "148mm"}
            height="94mm"
            style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                fillRule: "evenodd",
                clipRule: "evenodd",
            }}
            version="1.1" 
            // viewBox="1000 9000 21000 29700"
            viewBox={`1000 ${viewBoxSecondValue} 21000 29700`}>
            <defs>
                <style>
                    {
                        ".fil0{fill:#90a2a2}.fil1{fill:#90a2a2}.fil2{fill:#90a2a2}.fil3{fill:#90a2a2}.fil7{fill:#90a2a2}.fil4{fill:#90a2a2}.fil6{fill:#90a2a2}.fil5{fill:#90a2a2}"
                    }
                </style>
            </defs>
            <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"/>
            <path className="fil0" data-id="POSTERIOR_GLUTEO" d="M8176.38 16107.82c460.04,1.88 1598.53,-52.85 1962.25,-195.38 411.48,-161.22 489.02,-508.86 593.82,-542.6 2.12,-0.68 12.42,-0.92 14.39,-1.16 1.98,-0.29 12.47,1.11 14.25,1.11l27.87 4.86c14.68,-744.97 63.69,-1538.27 -5.25,-2283.18 -158.17,-64.75 135.13,0.86 -39.85,5.92 -207.04,6.01 -22.29,-143.5 -390.83,-428.9 -415.76,-321.94 -668.23,-460.43 -1300.56,-370.08 -227.21,32.49 -255.75,-26.24 -267.11,220.13 -45.78,990.95 -985.61,2476.26 -947.96,2676.46 0.67,3.61 56.94,126.51 71.82,158.66 102.38,221.72 229.95,499.86 267.16,754.16z"/>
            <path className="fil0" data-id="POSTERIOR_GLUTEO" d="M13515.29 16067.05c55.22,-380.18 292.68,-763.26 331.09,-888.22 41.88,-136.08 -470.35,-1143.88 -603.4,-1487.19 -89.53,-230.87 -179.31,-392.17 -242.13,-615.05l-115.76 -739.91c-67.11,-111.78 8.32,-35.67 -138.49,-64.55 -482.1,-94.83 -971.6,-36.35 -1341.05,300.56 -458.17,417.78 -458.36,529.8 -457.35,1008.52 0.72,325.79 -43.76,1509.34 -11.02,1662.31 12.56,58.83 245.25,386.21 359.29,475.65 458.02,359.24 1141.04,272.98 1775.72,343.12 128.96,14.24 308.99,5.34 443.1,4.76z"/>
            <path className="fil0" data-id="POSTERIOR_CABECA" d="M9880.38 3424.75c762.97,-1171.8 1237.41,-1105.28 1930.53,-40.78 182.49,-262.05 292.38,-329.01 306.73,-728.55 8.71,-242.13 -68.16,-206.79 -68.6,-443.97 -1.39,-796.47 -130.26,-1563.48 -1222.87,-1435.34 -1077.83,126.4 -1182.15,466.54 -1183.97,1476.07 -0.44,258.59 -213.44,610.47 129.44,1011.93l108.74 160.64z"/>
            <path className="fil0" data-id="POSTERIOR_ANTEBRACO_ESQUERDO" d="M4341.45 13581.26c177.72,129.58 426.97,280.25 655.19,321.27 86.12,-124.15 132.72,-328.59 212.62,-476.37l833.3 -1326.41c431.21,-592.95 907.58,-980.7 989.94,-1899.25 -342.88,-4.47 -551.17,47.32 -799.08,-99.25 -274.76,-162.42 -263.35,-310.25 -459.41,-468.95 -324.45,786.6 -447.63,880.13 -790.89,1896.54 -113.32,335.52 -618.03,1809.18 -641.67,2052.42z"/>
            <path className="fil0" data-id="POSTERIOR_ANTEBRACO_DIREITO" d="M14659.17 10160.12c92.81,1076.39 876.05,1595.35 1540.48,2733.31 96.13,164.68 173.97,295.13 268.03,465.92 84.14,152.69 135.6,369.83 226.92,502.21 227.49,-39.81 478.81,-191.73 655.48,-321.07 -32.69,-338.89 -831.52,-2616.15 -1007.41,-3031.81 -137.43,-324.69 -301.53,-620.34 -425.39,-916.72 -185.09,150.62 -184.65,294.02 -433.76,452.92 -259.89,165.78 -454.66,109.08 -824.35,115.24z"/>
            <path className="fil1" data-id="POSTERIOR_CRURAL_ESQUERDO" d="M7647.16 26136.29c-90.11,168.14 -102.29,346.3 -139.94,591.65l-69.65 462.7c-40.82,107.39 31.15,42.16 -76.87,93.38 -61.81,-105.27 -42.03,-82.31 -21.67,-229.76 69.51,-502.93 24.6,-610.37 251.23,-1058.53l458.79 -1088.57c86.27,-218.2 243.1,-507.36 294.8,-728.45 -79.58,-58.92 -129.16,-79.29 -207.04,-124 -231.97,-133.34 -371.38,-377.83 -394.48,-541.45 -1.98,-13.72 -9.29,-17.14 -14.78,-25.17 -200.59,134.3 -119.48,156.2 -418.36,272.07 -163.33,63.3 -339.03,108.11 -480.6,173.24 346.87,559.06 298.16,862.08 300.52,1590.35l-51.36 1385.91c0.67,40.24 7.46,220.03 2.45,246.65 -23.01,121.98 16.32,78.51 -86.36,119.72 -69.89,-102.44 -41.87,-280.25 -41.54,-407.67 0.48,-182.54 14.3,-258.98 30.71,-376.67 31.92,-228.89 10.16,-600.61 10.11,-845.67 -0.05,-327.19 38.9,-909.79 -58,-1204.92 -30.33,-92.42 -115.19,-199 -117.22,-234.57 -73.5,620.77 -56.36,1357.8 -83.8,1996 -14.06,328.1 -26.72,651.53 -46.02,979.97 -28.74,489.94 28.06,721.67 23.25,824.35 -7.75,164.62 4.62,41.35 -26.53,101.81 142.63,41.73 132.81,114.46 336.05,159.86 424.28,94.83 482.09,-178.54 598.53,-325.5 353.86,-446.52 430.06,-960.48 207.14,-1498.22 -20.89,-50.4 -48.38,-118.9 -74.37,-169.59l-104.99 -138.92z"/>
            <path className="fil1" data-id="POSTERIOR_CRURAL_DIREITO" d="M14575.46 24749.32c0.68,-458.5 215.46,-661.21 287.62,-857.08 -149.95,-68.26 -334.55,-116.06 -510.4,-184.12 -269.13,-104.17 -207.13,-141.28 -388.94,-260.57 -52.52,77.5 -9.48,-1.2 -53.82,106.24 -22.24,53.92 -21.18,64.7 -42.5,120.06 -128.58,333.83 -249.06,263.74 -520.03,464.08 53.05,226.01 215.27,527.49 306.35,757.92l461.15 1086.07c159.04,300.13 307.02,1107.24 215.65,1261.33 -108.07,-51.75 -49.87,-5.78 -85.25,-126.31 -3.18,-10.79 -22.57,-141.53 -22.67,-142.2 -42.07,-290.99 -69.13,-676.56 -178.11,-879.17l-294.84 718.3c-50.54,304.61 17.53,541.63 136.47,782.75l301.15 477.18c259.12,390.25 761.14,11.08 819.14,-5.92 -36.2,-70.37 10.79,-665.78 -5.34,-961.05 -18.24,-333.11 -32.83,-634.74 -44.77,-971.69 -22.04,-623.47 -11.26,-1363.68 -82.94,-1969.38 -2.02,37.06 -61.28,102.48 -93.24,173.87 -128.28,286.36 -91.17,1642.96 -83.18,1960.09 4.57,182.58 119.38,762.97 0.43,935.59 -111.63,-45.35 -82.36,31.24 -89.05,-198.57l-32.88 -2287.42z"/>
            <path className="fil0" data-id="POSTERIOR_TORAXICA" d="M8465.44 5104.53l352.02 335.86c431.99,415.66 117.07,439.34 436.13,949.83 163.13,261.1 1388.12,1747.42 1555.73,1877.97 12.9,-361.6 73.89,-2757.72 -26.76,-2901.12 -84.91,-120.97 10.54,74.33 -120.82,-95.07 -151.15,-194.86 -166.27,-112.64 -400.5,-176.9l-61.09 -21.61c-213.78,-74.38 -106.38,-24.07 -351.4,-10.21 -399.82,22.62 -989.07,-42.07 -1047.03,-32.97 -110.09,17.28 -228.98,52.08 -336.28,74.22z"/>
            <path className="fil0" data-id="POSTERIOR_FERMURAL_DIREITO" d="M14006.15 20347.92c-30.76,-316.55 -58.44,-1775.82 -119.09,-1920.81l-364.83 -1142.96c-172.29,-889.33 -61.23,-496.39 -55.41,-1086.36l-1051.41 -44.72c6.55,314.14 357.76,2215.46 426.02,2464.57 159.57,582.07 368.92,1649.6 1164.72,1730.28z"/>
            <path className="fil0" data-id="POSTERIOR_TORAXICA" d="M10948.05 8175.53l87.08 -91.22c36.01,-41.79 36.3,-46.02 73.8,-89.34 280.93,-324.59 1196.97,-1421.01 1344.75,-1670.31 288.82,-487.24 -5.82,-515.4 420.53,-924.66 60.89,-58.44 102.91,-109.99 163.61,-164.29 79,-70.67 133.15,-93.49 188.17,-171.95 -97.43,-20.02 -166.02,-37.4 -268.03,-58.97 -240.1,-50.78 -149.89,-26.57 -306.48,0.87 -217.39,38.08 -461.59,17.91 -686,17.81 -226.92,-0.1 -288.87,-53.19 -419.81,-14.68l-149.46 53.14c-230.91,53.77 -372.58,70.33 -432.85,301.44 -78.37,300.52 -13.24,2331.61 -15.31,2812.16z"/>
            <path className="fil0" data-id="POSTERIOR_FERMURAL_ESQUERDO" d="M8225.04 16247.61c6.74,593.82 107.54,210.94 -49.43,1043.08 -89.78,475.93 -401.8,1258.35 -408.11,1342.98 -14.15,189.46 -6.69,417.92 -14.2,613.84 -14.34,373.06 -32.97,769.08 -67.78,1141.18 583.62,-58.1 864.98,-672.95 1000.68,-1161.06 287.81,-1035.14 339.41,-1316.64 496.38,-2397.66 30.33,-208.57 89.78,-461.29 93.29,-639.59l-1050.83 57.23z"/>
            <path className="fil1" data-id="POSTERIOR_LOMBAR" d="M9479.49 10891.13c380.19,562.81 570.23,499.75 837.44,1486.13 79.62,293.87 86.21,65.8 305.86,390.48 25.76,38.08 42.75,76.4 81.45,108.79l70.71 33.75c6.17,2.5 24.51,3.99 35,12.61l2.89 -4521.55c-11.31,-0.15 35.57,-106.1 -168.53,-19.5 -166.79,70.76 -816.6,1401.32 -935.25,1759.99 -83.42,252.23 -168.15,496.67 -229.57,749.3z"/>
            <path className="fil0" data-id="POSTERIOR_FERMURAL_ESQUERDO" d="M8787.91 19939.72c0,295.7 225.14,935.01 332.14,1149.03 150.96,-185.48 202.95,-1162.22 242.52,-1469.62 101.86,-792.15 223.35,-1338.26 551.17,-2017.86l435.01 -827.42c79.33,-146.34 129.82,-134.55 168.38,-278.86 58.01,-217.29 73.6,-516.75 129.49,-742.71 -168.57,82.51 -256.14,200.78 -431.5,276.07 -209.25,89.73 -387.21,85.25 -651.29,123.9 -205.35,30.09 -173.05,79.04 -234.62,497.74 -36.78,250.22 -59.21,441.85 -98.2,676.9l-286.18 1587.99c-12.51,101.52 -47.36,247.43 -66.14,342.88 -45.2,229.33 -90.78,412.82 -90.78,681.96z"/>
            <path className="fil0" data-id="POSTERIOR_FERMURAL_DIREITO" d="M12571.18 21047.97c115.15,-229.46 320.89,-823.47 334.46,-1149.17l-427.5 -2508.03c-271.26,-1731.87 -25.76,-1100.07 -911.67,-1370.94 -240.83,-73.65 -314.53,-206.85 -521.8,-308.32 57.09,230.91 73.45,470.73 123.03,710.12l303.65 549.29c1122.07,1834.84 806.3,3716.41 1099.83,4077.05z"/>
            <path className="fil0" data-id="POSTERIOR_TORAXICA" d="M10500.72 8201.04l-653.7 -810.19c-561.38,88.91 -1133.48,252.47 -1616.3,9.09 -68.54,500.29 -213.58,747.33 -35.09,1227.79 44.72,120.39 80,114.51 247.76,242.89 511.51,391.45 933.14,449.56 1468.85,88.1 241.65,-163.09 449.31,-501.4 588.48,-757.68z"/>
            <path className="fil0" data-id="POSTERIOR_TORAXICA" d="M11190.52 8160.27c141.72,260.9 330.89,566.81 564.69,740.92 214.36,159.62 694.14,348.03 1068.74,197.7l587.56 -392.17c58.3,-53.72 36.78,-14.88 72.98,-90.64 195.38,-408.54 36.1,-831.33 -23.98,-1256.91 -481.75,242.85 -1056.12,79.62 -1616.29,-9.05l-653.7 810.15z"/>
            <path className="fil0" data-id="POSTERIOR_LOMBAR" d="M10950.41 12885.44l168.77 -232.98c73.17,-88.38 168.58,-125.64 212.24,-196.02 98.2,-158.32 62.77,-499.32 495.76,-1133.86 115.53,-169.3 276.02,-311.83 384.57,-472.18 -58.68,-241.5 -139.75,-477.23 -219.75,-718.3 -143.69,-433.23 -577.74,-1335.17 -862.66,-1704.72 -95.94,-124.43 -14.11,-67.63 -141.04,-103.35 -29.9,47.22 -17.77,-0.87 -33.6,87.46l-6.69 2153.56c1.49,770.23 -13.67,1551.98 2.4,2320.39z"/>
            <path className="fil1" data-id="POSTERIOR_OMBRO_DIREITO" d="M15061.45 7178.66c-36.87,-853.66 -31.04,-1191.29 -546.01,-1649.65 -289.11,-257.3 -958.22,-506.65 -1168.38,-394.05l-310.05 264.08c-471.89,427.02 -347.89,691 14.92,1023.92 353.52,324.34 1096.65,495.9 1572.68,627.85 125.88,34.85 345.58,82.94 436.84,127.85z"/>
            <path className="fil1" data-id="POSTERIOR_OMBRO_ESQUERDO" d="M6629.83 7219.86c82.94,-41.15 300.28,-90.93 404.93,-119.62 144.94,-39.66 296.09,-78.89 443.39,-126.84 467.41,-152.01 1098.29,-287.71 1416.33,-783.91 193.42,-301.67 -86.07,-611.19 -239.91,-750.02 -59.35,-53.58 -77.12,-59.45 -135.99,-107.06 -206.7,-167.03 -114.95,-239.38 -610.04,-130.74 -311.83,68.41 -538.31,195.06 -732.74,368.11 -515.74,459.08 -507.94,796.13 -545.97,1650.08z"/>
            <path className="fil2" data-id="POSTERIOR_CRURAL_ESQUERDO" d="M7811.93 23078.2c-0.34,213.63 68.02,498.36 175.89,678.2 116.01,193.46 238.81,209.44 431.74,291.52 436.08,-1101.28 455.04,-977.52 500.05,-2234.57 21.86,-609.7 225.47,-325.55 -18.05,-845.62 -72.01,-153.8 -111.97,-222.63 -236.55,-321.17 -175.21,103.74 -445.07,859.63 -533.21,1082.89 -150.62,381.63 -320.64,812.55 -319.87,1348.75z"/>
            <path className="fil3" data-id="POSTERIOR_CRURAL_DIREITO" d="M13271.91 24006.91c362.96,-153.18 441.23,-167.67 561.86,-651.01 193.32,-774.47 -288.63,-1691.68 -575.91,-2384.32 -66.14,-159.48 -105.18,-291.71 -231.59,-365.7 -112.16,89.4 -155.34,151.93 -223.55,293.5 -266.48,553.09 -54.92,258.54 -32.44,831.8 50.25,1282.95 41.97,1124.91 501.63,2275.73z"/>
            <path className="fil1" data-id="POSTERIOR_MAO_DIREITA" d="M16672.4 14029.61c-14.34,486.13 56.9,647.29 137.05,1068.44 62.68,329.26 -2.79,816.7 170.5,1053.43 111.63,-156.78 71.05,-554.44 178.01,-801.04 150.48,280.25 79.91,777.22 270.34,995.76 144.51,-221.24 -4.28,-756.38 42.22,-1050.45 124.91,166.89 223.54,732.17 306.39,868.83 88.52,146.09 28.45,58.34 113.99,106.96l-169.83 -1112.01c169.06,221.28 259.89,707.42 514.05,818.61 -28.83,-436.26 -311.15,-863.38 -361.41,-1288.67 61.9,42.45 126.55,102.48 185.62,175.36 102.38,126.41 56.65,147.16 221.86,188.07 -75.77,-597.91 -555.98,-1173.82 -852.89,-1391.16 -109.99,62.97 -226.63,129.54 -368.2,201.84 -115.96,59.21 -313.23,114.33 -387.7,166.03z"/>
            <path className="fil1" data-id="POSTERIOR_MAO_ESQUERDA" d="M3410.48 15093.63c237.41,-57.77 111,-157.36 407.19,-363.53 -50.01,431.98 -332.38,846.1 -361.12,1288.81 232.21,-101.13 375.66,-594.39 481.99,-810.96 93.24,287.86 -152.01,754.02 -138.58,1104.74 264.7,-149.17 243.47,-737.65 420.76,-976.17 47.13,295.37 -101.86,826.9 42.27,1050.64 72.39,-82.75 63.49,-86.84 91.26,-225.95 39.24,-196.74 109.03,-639.31 179.07,-770.05 107.88,248.39 66.38,642.82 178.01,801.29 174.36,-237.03 108.55,-730.62 171.71,-1053.82 82.07,-420.42 150.19,-587.36 135.79,-1068.25 -75.33,-52.37 -271.35,-106.72 -387.6,-166.07 -142.1,-72.59 -257.72,-138.98 -368.24,-202.03 -296.82,221.43 -776.16,790.4 -852.51,1391.35z"/>
            <path className="fil2" data-id="POSTERIOR_CRURAL_ESQUERDO" d="M7670.07 20658.59c-54.2,891.31 -799.12,887.99 -815.82,3096.32 308.31,-34.66 716.61,-208.53 783.81,-438.05 50.02,-170.74 34.42,-349.66 63.49,-549.58 83.47,-573.16 217.58,-849.76 423.95,-1369.01 165.2,-415.91 320.25,-576.64 167.42,-882.69 -265.82,-10.49 -303.8,14.06 -622.85,143.01z"/>
            <path className="fil3" data-id="POSTERIOR_CRURAL_DIREITO" d="M14837.04 23714.14c-14.35,-2200.73 -761.62,-2206.31 -815.68,-3096.41 -312.89,-126.36 -329.26,-150.05 -622.85,-143.88 -229.51,462.78 394.58,997.06 585.4,2218.05 29.7,189.8 24.5,390.92 62.19,550.49 39.95,169.06 145.86,244.64 292.14,315.4 138.54,67 297.92,133.72 498.8,156.35z"/>
            <path className="fil0" data-id="POSTERIOR_BRACO_ESQUERDO" d="M5856.27 9501.03l35.29 46.45c464.66,577.79 413.25,540.87 1180.31,523.73l466.45 -1135.74c-294.55,-595.17 -123.57,-422.5 -260.08,-1018.82l-937.28 569.07c-2.16,2.12 -469.96,977.23 -484.69,1015.31z"/>
            <path className="fil0" data-id="POSTERIOR_BRACO_DIREITO" d="M14154.99 8893.92l475.16 1130.5c643.83,43.27 722.34,30.66 1000.09,-320.45l205.16 -243.33c-14.44,-37.69 -483.01,-1013.96 -484.88,-1015.83 -5.97,-6.02 -15.5,-13.39 -22.2,-18.63l-914.89 -549.92c-48.37,210.79 -74.51,624.43 -138.87,797.24 -45.59,122.42 -62.1,103.11 -119.57,220.42z"/>
            <path className="fil0" data-id="POSTERIOR_LOMBAR" d="M8384.33 12312.61c689.51,-138.44 1156.01,-293.78 1789.39,46.5 -69.84,-283.24 -134.92,-475.26 -268.7,-710.89 -262.34,-462.3 -1086.64,-1273.17 -1476.65,-1563.05 -21.56,1057.28 178.25,634.2 -44.04,2227.44z"/>
            <path className="fil0" data-id="POSTERIOR_LOMBAR" d="M11517.51 12318.34c632.28,-339.66 1099.98,-185.67 1789.4,-46.5 -53.67,-384.86 -107.97,-681.96 -108.65,-1095.46 -0.67,-386.2 71.44,-773.84 64.6,-1131.94 -552.85,413.6 -754.3,693.08 -1121.35,1103.06 -158.32,176.81 -176.8,154.14 -340.23,434.34 -135.02,231.49 -209.68,436.17 -283.77,736.5z"/>
            <path className="fil0" data-id="POSTERIOR_CERVICAL" d="M9192.93 4928.98c370.32,34.7 1056.85,55.07 1315.68,-183.16 117.17,-107.78 87.32,-121.79 218.06,-159.05 4.86,-1.39 17.86,-3.66 22.15,-4.71 131.55,-32.26 75.76,-800.71 75.76,-1068.36l0.68 -816.01c-415.33,63.78 -928.23,889.28 -943.44,982.47 -57.67,353.62 11.51,462.74 -178.92,791.08 -140.37,242.04 -285.36,302.16 -509.97,457.74z"/>
            <path className="fil0" data-id="POSTERIOR_CERVICAL" d="M10948.25 4532.04c238.9,64.31 211.9,481.56 1550.1,356.17 -215.31,-149.13 -359.92,-212.24 -494.75,-432.32 -151.15,-246.61 -168,-420.96 -188.55,-739 -15.93,-246.41 -372.97,-642.63 -553.29,-844.08 -85.87,-95.94 -179.45,-140.75 -314.57,-174.64l1.06 1833.87z"/>
            <path className="fil0" data-id="POSTERIOR_TORAXICA" d="M8393.76 9871.97c438.87,319.29 608.69,620.92 964.14,901.22l40 -84.53c16.61,-41.11 25.9,-69.46 43.76,-122.36 26.76,-79.28 50.35,-156.16 80.24,-245.31 274.43,-818.71 457.21,-1033.45 571.53,-1347.35 -445.84,305.33 -926.35,498.46 -1428.61,205.88 -142.92,-83.28 -267.54,-196.01 -409.98,-283.09l138.92 975.54z"/>
            <path className="fil0" data-id="POSTERIOR_TORAXICA" d="M12781.69 9261.3c-131.22,0 -227.35,-1.15 -356.99,12.13 -290.65,29.85 -602.33,-186.81 -826.84,-340.56 103.87,285.4 296.57,538.46 561.27,1317.02l174.21 482.58c375.66,-295.23 502.65,-563.74 965.53,-901.08l139.93 -975.21c-111.67,67.01 -557.32,405.12 -657.11,405.12z"/>
            <path className="fil0" data-id="POSTERIOR_TORAXICA" d="M8136.47 6898.07c119.24,540.82 117.89,298.93 148.55,381.29l117.94 42.6c536.34,152.55 794.5,68.84 1321.07,-59.11l-691.1 -1017.18c-72.21,170.5 -604.27,538.27 -896.46,652.4z"/>
            <path className="fil0" data-id="POSTERIOR_TORAXICA" d="M11967.21 7222.08c402.09,97.33 708.91,193.08 1122.75,105.8l394.82 -175.74c29.7,-67.4 10.54,-17.48 29.6,-93.53 18.92,-75.34 25.13,-129.83 40.82,-201.31 -228.55,-88.82 -325.26,-138.97 -501.11,-273.76l-395.78 -378.5 -503.9 757.05c-101.23,128.48 -106.43,109.85 -187.2,259.99z"/>
            <path className="fil1" data-id="POSTERIOR_BRACO_DIREITO" d="M15294.68 8267.81c-45.4,-166.22 -155.15,-899.92 -270,-959.04 -8.14,-4.18 -45.64,-24.31 -57.29,-29.22l-1041.34 -274.23c68.4,159.48 137.72,284.97 236.69,426.44 200.44,286.47 411.52,414.32 706.74,597.38l425.2 238.67z"/>
            <path className="fil1" data-id="POSTERIOR_BRACO_ESQUERDO" d="M6396.56 8308.58c629.73,-346.88 1063.49,-544.38 1369.06,-1262.92l-1045.43 271.2c-182.01,72.59 -114.09,114.23 -187.55,465.1 -35.91,171.32 -92.52,355.25 -136.08,526.62z"/>
            <path className="fil1" data-id="POSTERIOR_FERMURAL_ESQUERDO" d="M7767.21 18187.2l68.45 -136.42c29.03,-77.12 32.16,-103.74 46.5,-157.27 264.18,-985.55 424.72,-1316.06 -31.19,-2357.51l-92.18 -161.3c-9.48,457.88 -35.19,914.26 -31.72,1385.81 3.56,482.91 43.18,952.2 40.14,1426.69z"/>
            <path className="fil1" data-id="POSTERIOR_FERMURAL_DIREITO" d="M13924.03 18146.04c47.46,-1310.82 40.14,-1483.73 14.24,-2811.83l-84.96 132.81c-34.7,73.89 -28.3,69.03 -58.34,145.96 -38.61,98.77 -83.04,202.99 -121.21,327.57 -220.08,718.3 -64.12,1346.73 171.8,2038.98 1.54,4.58 29.41,78.03 34.13,88.19 44.09,94.97 13.53,34.03 44.34,78.32z"/>
            <path className="fil1" data-id="POSTERIOR_FERMURAL_ESQUERDO" d="M9400.02 20449.34c88.04,-119.95 119.91,-284.29 158.42,-432.12 120.82,-463.66 190.81,-1004.38 356.98,-1394.77 156.64,-368.06 363.63,-868.1 458.7,-1251.03 17.66,-71.2 39.9,-153.7 55.55,-234.67 30.08,-155.91 31.14,-180.08 -11.84,-253.83 -71.92,261.77 -707.91,1080.44 -898.53,2524.79 -19.3,146.48 -51.22,370.94 -68.4,502.11 -20.36,154.96 -49.1,414.08 -50.88,539.52z"/>
            <path className="fil1" data-id="POSTERIOR_FERMURAL_DIREITO" d="M12291.36 20408.57l-119.28 -1041.68c-41.16,-311.26 -106.14,-615.19 -203.91,-936.89 -95.6,-314.48 -487.38,-1317.17 -738.13,-1587.85 107.15,1002.55 516.22,1354.96 787.57,2641.61l273.75 924.81z"/>
            <path className="fil1" data-id="POSTERIOR_BRACO_DIREITO" d="M14074.07 8729.39c59.3,-54.35 13.77,25.71 77.69,-95.94 48.52,-92.42 188.17,-764.31 66.33,-929.71l-519.1 -786.46c-94.11,96.61 -46.94,16.27 -76.16,207.75 -118.08,773.04 311.88,1114.42 451.24,1604.36z"/>
            <path className="fil1" data-id="POSTERIOR_BRACO_ESQUERDO" d="M7617.22 8770.11c143.64,-505.14 548.42,-777.6 455.95,-1569.45 -19.59,-168.14 5.2,-155.24 -80.87,-242.61 -83.13,77.02 -292.24,504.95 -499.56,764.94 -132.86,166.65 -57.29,497.4 -0.15,794.26 23.01,119.48 41.54,176.04 124.63,252.86z"/>
            <path className="fil1" data-id="POSTERIOR_GLUTEO" d="M8350.92 12453.75c-167.03,779.86 -462.98,1525.7 -532.73,2340.7l52.52 -125.01c320.83,-649.7 801.62,-1566.23 792.33,-2268.21 -149.22,-1.73 -189.75,15.4 -312.12,52.52z"/>
            <path className="fil1" data-id="POSTERIOR_GLUTEO" d="M13873.05 14753.68c-69.9,-814.43 -365.31,-1560.65 -532.69,-2340.7 -168.81,-38.76 -101.28,-55.12 -311.97,-52.38 -6.55,542.55 170.21,914.99 338.88,1287.86l505.78 1105.22z"/>
            <path className="fil1" data-id="POSTERIOR_FERMURAL_ESQUERDO" d="M8104.65 20357.59c241.89,91.61 266.15,-11.98 380.53,259.94 95.88,-106.43 82.31,-104.02 271.3,-108.21 -51.13,-319.77 -92.33,-425.43 -91.51,-773.37l-113.75 171.08c-41.3,65.23 -69.32,105.52 -119.67,166.17l-326.9 284.39z"/>
            <path className="fil1" data-id="POSTERIOR_FERMURAL_DIREITO" d="M12934.76 20468.55c189.61,4.19 175.37,1.2 271.35,108.21 115.53,-272.16 139.36,-167.23 380.52,-260.37 -186.48,-139.89 -125.78,-48.14 -307.74,-262.35l-252.19 -358.42c0.44,347.54 -40.43,453.64 -91.94,772.93z"/>
            <path className="fil4" d="M10430.29 4981.01c185.23,113.46 97.91,-29.17 347.36,218.98l43.56 -498.46 -390.92 279.48z"/>
            <path className="fil1" d="M10948.39 5101.69c234.57,-159.57 191.25,-87.65 312.31,-161.45l-313.32 -221.09 1.01 382.54z"/>
            </g>
        </svg>
        </div>
    )
}

export default Back
