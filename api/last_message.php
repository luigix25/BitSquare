<?php
require('utilities.php');
session_start();

if(!isset($_SESSION["user"]))
die();

$sql = "
select *,date_format(f.max,'%H:%i') as ts from
(select m4.contenuto,IF(m4.mittente=".$_SESSION["user"].",m4.destinatario,m4.mittente) as chat,IF(m4.mittente=".$_SESSION["user"].",1,0) as io,max
from
(
select * 
from
(select m1.mittente,m1.destinatario,max(m1.timestamp) as max
from my_luigix25.messaggi m1
where m1.mittente = ".$_SESSION["user"]." or m1.destinatario = ".$_SESSION["user"]."
group by m1.mittente,m1.destinatario)
as d
where not exists(
select *
from my_luigix25.messaggi m2
where m2.timestamp > d.max
and ((m2.mittente = d.mittente and m2.destinatario = d.destinatario) or (m2.mittente = d.destinatario and m2.destinatario = d.mittente)) 
)
) as e
inner join my_luigix25.messaggi m4 on (e.max = m4.timestamp)
) as f
inner join my_luigix25.utenti u on (u.id = f.chat)

";

$util = new Utilities;

$ris = $util->eseguiQuery($sql);

print(json_encode($ris));

?>