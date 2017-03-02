<!doctype html>
<html>
<head>
<title>Gestione Partita</title>
<script src="../jquery.js"></script>

<script src="js/startup.js"></script>
<script src="js/marines.js"></script>
<script src="js/maps.js"></script>
<script src="js/docs.js"></script>

<link rel="stylesheet" href="css/index.css"/>
</head>
<body>
<form id="marineForm">
    <select name="marine">
        <option value="0"> Marine 1 </option>
        <option value="1"> Marine 2 </option>
        <option value="2"> Marine 3 </option>
        <option value="3"> Marine 4 </option>
    </select>
    <hr>
    HP: <input type="number" name="hp" placeholder="HP totali"> <br>

    <div id="boxes" style="display: inline-block">
        <p>Armatura</p>
        <span>Testa:</span><input type="number" name="armor_head" placeholder="Head Crits">
        <input type="checkbox" id="armor_headrem" name="armor_headrem"><label for="headrem">Rimosso</label> <br>

        <span>Torso: </span><input type="number" name="armor_torso" placeholder="Torso Crits"> 
        <input type="checkbox" id="armor_torsorem" name="armor_torsorem"><label for="torsorem">Rimosso</label> <br>

        <span>Braccio DX: </span><input type="number" name="armor_armR" placeholder="Right Arm Crits"> 
        <input type="checkbox" id="armor_armRrem" name="armor_armRrem"><label for="armRrem">Rimosso</label> <br>

        <span>Braccio SX: </span><input type="number" name="armor_armL" placeholder="Left Arm Crits"> 
        <input type="checkbox" id="armor_armLrem" name="armor_armLrem"><label for="armLrem">Rimosso</label> <br>

        <span>Gamba DX: </span><input type="number" name="armor_legR" placeholder="Right Leg Crits"> 
        <input type="checkbox" id="armor_legRrem" name="armor_legRrem"><label for="legRrem">Rimosso</label> <br>

        <span>Gamba SX: </span><input type="number" name="armor_legL" placeholder="Left Leg Crits">  
        <input type="checkbox" id="armor_legLrem" name="armor_legLrem"><label for="legLrem">Rimosso</label><br>
    </div>
    <div style="display: inline-block">
        <p>Corpo</p>
        <input type="number" name="body_head" placeholder="Head Crits">
        <input type="checkbox" id="body_headrem" name="body_headrem"><label for="headrem">Rimosso</label> <br>

        <input type="number" name="body_torso" placeholder="Torso Crits"> 
        <input type="checkbox" id="body_torsorem" name="body_torsorem"><label for="torsorem">Rimosso</label> <br>

        <input type="number" name="body_armR" placeholder="Right Arm Crits"> 
        <input type="checkbox" id="body_armRrem" name="body_armRrem"><label for="armRrem">Rimosso</label> <br>

        <input type="number" name="body_armL" placeholder="Left Arm Crits"> 
        <input type="checkbox" id="body_armLrem" name="body_armLrem"><label for="armLrem">Rimosso</label> <br>

        <input type="number" name="body_legR" placeholder="Right Leg Crits"> 
        <input type="checkbox" id="body_legRrem" name="body_legRrem"><label for="legRrem">Rimosso</label> <br>

        <input type="number" name="body_legL" placeholder="Left Leg Crits">  
        <input type="checkbox" id="body_legLrem" name="body_legLrem"><label for="legLrem">Rimosso</label><br>
    </div>

    <br />
    <input type="submit" value="Invia!">
</form> 

<div>
    <p>Scelta mappe disponibi</p>
    <form id="mapForm">
        <div id="mapList">
        </div>

        <input type="submit" value="Invia">
    </form>
</div>

<div>
    <p>Scelta documenti accessibili</p>
    <form id="docForm">
        <div id="docList">
        </div>

        <input type="submit" value="Invia">
    </form>
</div>

</body>
</html>