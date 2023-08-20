//is this page necessary anymore?

<Drawer variant="permanent" open={open}>
<Divider />
<List>
  {posts.map((text: any, index: any) => (
    <ListItem
      key={index}
      onClick={() => navigate(`/posts/${text}`)}
      disablePadding
      sx={{
        display: "block",
        bgcolor:
          location.pathname === `/posts/${encodeURIComponent(text)}`
            ? "rgb(245, 245, 245)"
            : "white",
      }}
    >
      <ListItemButton
        sx={{
          minHeight: 12,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {/* {index % 2 === 0 ? <div></div> : <div></div>} */}
        </ListItemIcon>
        <ListItemText
          primary={text}
          style={{
            opacity: open ? 1 : 0.95,
            fontSize: open ? "1rem" : "0.5rem",
            color: open ? "black" : "black",
          }}
        />
      </ListItemButton>

      {/* delete list item */}

      {admin && (
        <Button onClick={() => handleDeleteItem(index)}>
          {open ? (
            <div id="delete"> Dele5te</div>
          ) : (
            <div id="x">x</div>
          )}
        </Button>
      )}
    </ListItem>
  ))}
</List>
<Divider />
<List>
  <ListItem
    onClick={handleClickOpenPost}
    disablePadding
    sx={{ display: "block" }}
  >
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        +
      </ListItemIcon>
      <ListItemText
        primary={"Add post"}
        sx={{ opacity: open ? 1 : 0 }}
      />
    </ListItemButton>
  </ListItem>
</List>
</Drawer>